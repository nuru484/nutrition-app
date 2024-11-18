const express = require('express');
const signUpRoutes = express.Router();
const controllers = require('../controllers/signup-controllers');

// Sign Up Routes and their handlers
signUpRoutes.get('/signup', controllers.signUpGet);
signUpRoutes.post('/signup', controllers.signUpPost);

module.exports = signUpRoutes;
