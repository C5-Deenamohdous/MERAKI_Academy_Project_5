const express = require("express");

const registerRouter = express.Router();

const { register } = require("../controllers/register");

registerRouter.post("/", register);

module.exports = registerRouter;
