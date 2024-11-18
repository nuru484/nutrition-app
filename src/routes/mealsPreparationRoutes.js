const express = require('express');
const mealsPreparationtRoutes = express.Router();

const controller = require('../controllers/mealPreparationController');

mealsPreparationtRoutes.get(
  '/meals/preparation/:mealId',
  controller.getMealPreparation
);

mealsPreparationtRoutes.post(
  '/meals/preparation/:mealId',
  controller.addMealPreparation
);

mealsPreparationtRoutes.put(
  '/meals/preparation/:mealId',
  controller.updateMealPreparation
);

module.exports = mealsPreparationtRoutes;
