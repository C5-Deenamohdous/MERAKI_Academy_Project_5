const connection = require("../models/db");

const authorization = (string) => {
  return (req, res, next) => {
    const query = `SELECT * FROM role_permission INNER JOIN permissions ON role_permission.permission_id= permissions.id WHERE role_permission.role_id=? AND  permissions.permission=?`;
    const data = [req.token.role, string];
    connection.query(query, data, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "server error",
        });
      }
      if (result.length) {
        next();
      } else {
        res.status(400).json({ message: "unauthorized" });
      }
    });
  };
};
module.exports = authorization;
