const express = require('express');
const waterRoutes = express.Router();
const controller = require('../controllers/water-controller');

waterRoutes.get('/water-consumption', controller.getUserWaterConsumption);

waterRoutes.post('/add-water', controller.addWaterConsumption);

waterRoutes.delete('/water-consumption/:id', controller.deleteWaterConsumption);

module.exports = waterRoutes;
