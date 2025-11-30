const express = require("express");
const conditionsRoutes = express.Router();
const controller = require("../controllers/conditions-controller");

conditionsRoutes.get("/conditions", controller.getConditions);

module.exports = conditionsRoutes;
