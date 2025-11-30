const express = require("express");
const userConditionsRoutes = express.Router();
const controller = require("../controllers/user-conditions-controller");

userConditionsRoutes.get("/user-conditions", controller.getUserConditions);

userConditionsRoutes.post("/user-conditions/add", controller.addUserCondition);

userConditionsRoutes.delete(
  "/user-conditions/remove/:conditionId",
  controller.removeUserCondition
);

module.exports = userConditionsRoutes;
