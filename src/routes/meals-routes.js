const express = require("express");
const mealsRoutes = express.Router();
const controller = require("../controllers/meals-controller");

mealsRoutes.get("/meals", controller.getMeals);

module.exports = mealsRoutes;
