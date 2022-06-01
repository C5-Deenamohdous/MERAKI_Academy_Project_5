const express = require("express");

const permissionsRouter = express.Router();

const { createPermission } = require("../controllers/permissions");

permissionsRouter.post("/:id", createPermission);

module.exports = permissionsRouter;
