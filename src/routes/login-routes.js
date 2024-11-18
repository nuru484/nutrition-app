const express = require('express');
const loginRoutes = express.Router();
const controllers = require('../controllers/login-controllers');

// Login Routes and their handlers
loginRoutes.get('/', controllers.loginPageGet);
loginRoutes.post('/', controllers.loginPagePost);
loginRoutes.get('/logout', controllers.logoutGet);

module.exports = loginRoutes;
