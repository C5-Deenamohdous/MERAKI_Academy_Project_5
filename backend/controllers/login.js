const connection = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email=?`;
  const data = [email.toLowerCase()];

  connection.query(query, data, async (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    if (result.length) {
      try {
        const passCompare = await bcrypt.compare(password, result[0].password);
        if (passCompare) {
          const payload = {
            userId: result[0].id,
            role: result[0].role_id,
          };
          const options = { expiresIn: "180m" };

          const secret = process.env.SECRET;
          const token = await jwt.sign(payload, secret, options);

          return res.status(200).json({
            success: true,
            message: "Login Successful",
            token: token,
            userId: result[0].id,
            role_id: result[0].role_id,
          });
        } else {
          return res.status(403).json({
            success: false,
            message: `The password you’ve entered is incorrect`,
          });
        }
      } catch (err) {
        res.status(500).json({
          success: false,
          message: `Server Error`,
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: `The email doesn't exist`,
      });
    }
  });
};

module.exports = login;
