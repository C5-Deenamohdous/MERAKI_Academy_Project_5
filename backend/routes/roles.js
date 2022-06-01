const express = require("express");

const rolesRouter = express.Router();

//import controller
const { createNewRole } = require("../controllers/roles");

rolesRouter.post("/", createNewRole);

module.exports = rolesRouter;
