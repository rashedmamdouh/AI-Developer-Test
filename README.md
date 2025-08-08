# E-commerce AI Features

## Overview

This project implements several AI-powered features for an e-commerce platform, including:

- **Smart Search:** Semantic search using embeddings to find relevant products.
- **Dynamic Pricing Prediction:** Price prediction based on product features using a regression model.
- **Product Recommendation:** Recommending products based on user preferences.

## Installation

First, make sure Node.js is installed.

Then run these commands to install required packages:

```
git clone https://github.com/rashedmamdouh/AI-Developer-Test
npm install react-material-ui-carousel --save --legacy-peer-deps
npm install axios ml-cart compute-cosine-similarity dotenv --legacy-peer-deps

```

### Test Ai_Features

```
cd ecommerce
node api/implemented_work/test_aifeatures.js
```

This will perform a smart search query, predict a product price dynamically, and output recommended products in the console.

---

### Test Products_Query

```
cd ecommerce
npm install react-material-ui-carousel --save --legacy-peer-deps
npm start
```
In PostMan:
```
http://localhost:4000/api/v1/products/all
http://localhost:4000/api/v1/products?category=Electronics&minPrice=50&maxPrice=150
```


## AI Features Chosen

- **Semantic Search with Embeddings:** Uses text embeddings generated via Google Gemini API to semantically match product descriptions with queries.
- **Decision Tree Regression:** A decision tree model predicts product prices dynamically based on rating, category, and current price.
- **Rule-based Recommendations:** Filters and sorts products based on preferred categories and price thresholds.

---

## Tools & Libraries Used

- **Node.js:** JavaScript runtime environment.
- **Axios:** For making HTTP requests to the embedding API.
- **ml-cart:** Machine learning library used for decision tree regression.
- **compute-cosine-similarity:** To compute cosine similarity between embedding vectors.
- **dotenv:** For managing environment variables like API keys.
- **Google Gemini API:** Used for generating text embeddings for semantic search.

---

## Assumptions & Notes

- The price prediction model is trained on a small static dataset of products, which may limit accuracy for real-world use.
- Product embeddings are computed on the fly; for large datasets, caching or batch processing is recommended.
- The `predictPrice` function expects inputs similar to the static product data structure.
- Environment variable `GEMINI_API_KEY` must be set in a `.env` file at the root or appropriate path.
- The demo script `test_aifeatures.js` is designed for testing and demonstration purposes and not production use.
