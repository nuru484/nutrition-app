const express = require('express');
const nutritionInfoRoutes = express.Router();
const controller = require('../controllers/nutritionInfoController');

nutritionInfoRoutes.get('/nutritional-info', controller.getNutritionInfoData);

module.exports = nutritionInfoRoutes;
