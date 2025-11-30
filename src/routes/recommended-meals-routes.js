const express = require("express");
const recommendedMealRoutes = express.Router();
const controller = require("../controllers/recommended-meals-controller");

recommendedMealRoutes.get("/recommended-meals", controller.getRecommendedMeals);

module.exports = recommendedMealRoutes;
