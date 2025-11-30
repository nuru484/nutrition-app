const express = require("express");
const routes = express.Router();

const signUpRoutes = require("./signup-routes");
const loginRoutes = require("./login-routes");
const dashboardRoute = require("./dashboard-route");
const mealsRoutes = require("./meals-routes");
const conditionsRoutes = require("./conditions-routes");

routes.use("/", signUpRoutes);

routes.use("/", loginRoutes);

routes.use("/", dashboardRoute);

routes.use("/", mealsRoutes);

routes.use("/", conditionsRoutes);

module.exports = routes;
