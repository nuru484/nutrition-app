const express = require('express');
const routes = express.Router();

const signUpRoutes = require('./signup-routes');
const loginRoutes = require('./login-routes');
const dashboardRoute = require('./dashboard-route');
const mealsRoutes = require('./meals-routes');
const exerciseRoutes = require('./exercise-routes');
const waterRoutes = require('./water-routes');
const weightRoutes = require('./weight-routes');
const nutritionGoalRoutes = require('./nutrionGoalRoutes.js');
const nutritionInfoRoutes = require('./nutritionInfoRoutes.js');
const mealsPreparationtRoutes = require('./mealsPreparationRoutes.js');

routes.use('/', signUpRoutes);

routes.use('/', loginRoutes);

routes.use('/', dashboardRoute);

routes.use('/', mealsRoutes);

routes.use('/', exerciseRoutes);

routes.use('/', waterRoutes);

routes.use('/', weightRoutes);

routes.use('/', nutritionGoalRoutes);

routes.use('/', nutritionInfoRoutes);

routes.use('/', mealsPreparationtRoutes);

module.exports = routes;
