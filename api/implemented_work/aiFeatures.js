// aiFeatures.js
require('dotenv').config({ path: __dirname + '/../.env' }); 

const axios = require("axios");
const DecisionTreeRegression = require("ml-cart").DecisionTreeRegression;
const cosineSimilarity = require("compute-cosine-similarity");
const staticProducts = require("../implemented_work/staticProducts.js");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_EMBED_URL = "https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent";

async function getEmbedding(text) {
  const response = await axios.post(
    GEMINI_EMBED_URL,
    {
      model: "models/embedding-001",
      content: { parts: [{ text }] },
    },
    { headers: { "Content-Type": "application/json", "X-goog-api-key": GEMINI_API_KEY } }
  );
  return response.data.embedding.values;
}

async function smartSearch(query, topK = 3) {
  const queryEmb = await getEmbedding(query);
  const scored = [];
  for (const product of staticProducts.products) {
    const prodEmb = await getEmbedding(product.name + " " + product.description);
    const score = cosineSimilarity(queryEmb, prodEmb);
    scored.push({ score, product });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map(x => x.product);
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function trainPricingModel() {
  const X = staticProducts.products.map(p => [
    p.rating,
    hashCode(p.category) % 1000,
    p.price,
  ]);
  const y = staticProducts.products.map(p => p.price);
  const model = new DecisionTreeRegression();
  model.train(X, y);
  return model;
}

const pricingModel = trainPricingModel();

function predictPrice(rating, category, currentPrice) {
  const categoryCode = hashCode(category) % 1000;
  const prediction = pricingModel.predict([rating, categoryCode, currentPrice]);
  if (Array.isArray(prediction)) return prediction[0]; // in case prediction is array
  return prediction;
}

function recommendProducts(preferredCategories, maxPrice) {
  return staticProducts.products
    .filter(p => preferredCategories.includes(p.category) && p.price <= maxPrice)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);
}

module.exports = {
  smartSearch,
  predictPrice,
  recommendProducts,
};
