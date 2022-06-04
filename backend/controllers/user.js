/* Importing the connection to the database. */
const connection = require("../models/db");


const getAllusers = (req, res) => {
  const query = `SELECT * FROM users WHERE is_deleted=0;`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "All the users",
      result: result,
    });
  });
};
const deleteUserById = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE users SET is_deleted=1 WHERE id=?;`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `The user: ${id} is not found`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `Succeeded to delete user with id: ${id}`,
      result: result,
    });
  });
};
/* Exporting the functions to be used in other files. */
module.exports = {
  getAllusers,
  deleteUserById,
};
