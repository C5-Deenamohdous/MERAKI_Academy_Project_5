const connection = require("../models/db");

const createPermission = (req, res) => {
  const role_id = req.params.id; //

  const { permission } = req.body;

  const query = `INSERT INTO permissions(permission) VALUES(?)`;
  const data = [permission];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    if (result.affectedRows) {
      const query = `INSERT INTO role_permission(role_id,permission_id) VALUES(?,?)`;
      const data = [role_id, result.insertId];

      connection.query(query, data, (err, response) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err,
          });
        }
        if (response.affectedRows) {
          res.status(201).json({
            success: true,
            message: `Created ${permission} Permission`,
          });
        }
      });
    }
  });
};

module.exports = {
    createPermission
}