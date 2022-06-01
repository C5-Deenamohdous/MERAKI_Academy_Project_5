const connection = require("../models/db");

const getAllCommentsById = (req, res) => {
  const product_id = req.params.id;
  const query = `SELECT * FROM comments RIGHT JOIN users ON users.id=comments.user_id  
  WHERE comments.is_deleted=0  AND comments.product_id=? ;`;
  data = [product_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.length) {
      res.status(404).json({
        success: false,
        massage: "The comment is Not Found",
      });
    }
    res.status(200).json({
      success: true,
      massage: ` comment with on product id  number :   ${product_id} `,
      result: result,
    });
  });
};
const createNewComment = (req, res) => {
  const product_id = req.params.id;
  const user_id = req.token.userId;

  const { comment } = req.body;

  const query = `INSERT INTO comments (comment, product_id, user_id) VALUES (?,?,?)`;
  const data = [comment, product_id, user_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(404).json({
        success: false,
        massage: "something went wrong while creating a new comment",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      massage: "The comment has been created success ",
      result: result,
    });
  });
};

module.exports = { getAllCommentsById, createNewComment };
