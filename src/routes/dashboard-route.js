const express = require('express');
const dashboardRoute = express.Router();
const controller = require('../controllers/dashboard-controller');

dashboardRoute.get('/dashboard', controller.getDashboardData);

module.exports = dashboardRoute;
