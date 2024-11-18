const express = require('express');
const nutritionGoalRoutes = express.Router();
const controller = require('../controllers/nutritionGoalController');

nutritionGoalRoutes.get('/nutrition-goals', controller.getUserNutritionGoals);

nutritionGoalRoutes.post('/nutrition-goals', controller.addNutritionGoal);

nutritionGoalRoutes.delete(
  '/nutrition-goals/:id',
  controller.deleteNutritionGoal
);

module.exports = nutritionGoalRoutes;
