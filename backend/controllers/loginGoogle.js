const connection = require("../models/db");
const jwt = require("jsonwebtoken");
const loginGoogle = (req, res) => {
  const email = req.body.email;
  console.log(email, "emailllllllllll");
  const query = "SELECT * FROM users WHERE email = ? ;";
  const data = [email];
  connection.query(query, data, (err, result) => {
    console.log(result, "rresulttttttt in query ");
    if (err) {
      console.log(err);
    }
    if (result.length) {
      try {
        console.log("try backkeeeeeeee");
        const payload = {
          userId: result[0].id,
          role: result[0].role_id,
        };
        const options = { expiresIn: "180m" };
        const secret = process.env.SECRET;
        const token = jwt.sign(payload, secret, options);

        return res.status(200).json({
          success: true,
          message: "Login Successful",
          token: token,
          userId: result[0].id,
          role_id: result[0].role_id,
        });
      } catch (err) {
        console.log("login error backkeeenndddd");
        res.status(500).json({
          success: false,
          message: `Server Error`,
        });
      }
    }
  });
};

module.exports = loginGoogle;
