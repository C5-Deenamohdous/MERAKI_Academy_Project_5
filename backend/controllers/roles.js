const connection = require("../models/db");

const createNewRole = (req, res) => {
  const { role } = req.body;
  const query = `INSERT INTO roles(role) VALUES(?)`;
  const data = [role];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    if (result.affectedRows) {
      res.status(201).json({
        success: true,
        message: `${role} Role Created`,
        result: result,
      });
    }
  });
};

module.exports = { createNewRole };
