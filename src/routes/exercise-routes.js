const express = require('express');
const exerciseRoutes = express.Router();
const controller = require('../controllers/exercise-controller');

exerciseRoutes.get('/exercises', controller.getExercises);

// Route to fetch a specific meal by ID
exerciseRoutes.get('/user-exercises', controller.getUserExercises);

exerciseRoutes.post('/add-user-exercise', controller.addUserExercise);

module.exports = exerciseRoutes;
