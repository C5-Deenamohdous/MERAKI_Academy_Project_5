const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
app.use(express.json());
app.use(cors());

//Routers
const rolesRouter = require("./routes/roles");

app.use("/role", rolesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
