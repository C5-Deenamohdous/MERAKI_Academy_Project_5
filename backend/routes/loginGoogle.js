const express = require("express");

const loginGoogleRouter = express.Router();

const loginGoogle = require("../controllers/loginGoogle");

loginGoogleRouter.post("/", loginGoogle);

module.exports = loginGoogleRouter;