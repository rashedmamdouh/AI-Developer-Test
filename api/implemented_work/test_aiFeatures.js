const {
  smartSearch,
  predictPrice,
  recommendProducts,
} = require("../Implemented_Work/aiFeatures.js");

(async () => {
  console.log("Smart Search Results:");
  const searchResults = await smartSearch(
    "wireless headphones with noise cancellation"
  );
  searchResults.forEach((p) => console.log(p));

  console.log(
    "............................................................................"
  );

  console.log("\n Dynamic Pricing Prediction:");
  const predictedPrice = predictPrice(4.5, "Electronics", 99.99);
  console.log(`Predicted Price: $${predictedPrice.toFixed(2)}`);

  console.log(
    "............................................................................"
  );

  console.log("Recommended Products:");
  const recommendations = recommendProducts(["Electronics", "Fitness"], 100);
  recommendations.forEach((p) => console.log(p));
})();
