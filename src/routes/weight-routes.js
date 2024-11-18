const express = require('express');
const weightRoutes = express.Router();
const controller = require('../controllers/weightController');

weightRoutes.get('/weight-records', controller.getUserWeightRecords);

weightRoutes.post('/add-weight', controller.addWeightRecord);

weightRoutes.delete('/weight-records/:id', controller.deleteWeightRecord);

module.exports = weightRoutes;
