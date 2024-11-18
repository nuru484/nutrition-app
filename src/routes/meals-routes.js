const express = require('express');
const mealsRoutes = express.Router();
const controller = require('../controllers/meals-controller');

mealsRoutes.get('/meals', controller.getMeals);

mealsRoutes.get('/meals/:id', controller.getMealById);

mealsRoutes.post('/user-meals', controller.addUserMeal);

mealsRoutes.get('/user-meals', controller.getUserMeals);

module.exports = mealsRoutes;
