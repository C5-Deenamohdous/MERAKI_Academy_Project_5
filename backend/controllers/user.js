/* Importing the connection to the database. */
const connection = require("../models/db");

const getUserById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM users WHERE id=?;`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }

    if (!result) {
      return res.status(404).json({
        success: false,
        massage: `The user: ${id} is not found`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `The user: ${id} is found`,
      result: result,
    });
  });
};

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

/* Updating the user with the given id. */
const updateUserById = (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    Address,
    profileImage,
  } = req.body;
  const id = req.params.id;
  const isemail = email ? true : false;
  const ispassword = password ? true : false;
  const isfirstName = firstName ? true : false;
  const islastName = lastName ? true : false;
  const isphoneNumber = phoneNumber ? true : false;
  const isprofileImage = profileImage ? true : false;
  const isAddress = Address ? true : false;

  const query = `UPDATE users SET 
    email=IF(${isemail},?,email),
    password=IF(${ispassword},?,password),
    firstName=IF(${isfirstName},?,firstName),
    lastName=IF(${islastName},?,lastName),
    phoneNumber=IF(${isphoneNumber},?,phoneNumber),
    profileImage=IF(${isprofileImage},?,profileImage),
    Address=IF(${isAddress},?,Address)

    WHERE id=? AND is_deleted=0  ;`;
  const data = [
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    profileImage,
    Address,
    id,
  ];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server err",
        err: err,
      });
    }
    if (!result) {
      return res.status(404).json({
        success: false,
        massage: `there is no  user whith id: ${id} `,
        err: err,
      });
    }
    if (!result.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `there is no changes to the user id: ${id} `,
        err: err,
      });
    }

    res.status(200).json({
      success: true,
      massage: `Succeeded to update user with id: ${id}`,
      result: result,
    });
  });
};

/* Exporting the functions to be used in other files. */
module.exports = {
  getUserById,
  getAllusers,
  deleteUserById,
  updateUserById,
};
