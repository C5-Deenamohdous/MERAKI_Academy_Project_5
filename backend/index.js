const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
app.use(express.json());
app.use(cors());

//Routers
const rolesRouter = require("./routes/roles");
const permissionsRouter = require("./routes/permissions");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const adminRouter = require("./routes/admin")

app.use("/role", rolesRouter);
app.use("/permission", permissionsRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/admin", adminRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
