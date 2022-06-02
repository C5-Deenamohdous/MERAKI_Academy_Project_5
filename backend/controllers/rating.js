const connection = require("../models/db");

const addRatingToProduct = (req, res) => {
  const user_id = req.token.userId;
  const product_id = req.params.id;
  const { rate } = req.body;
  const query = `INSERT INTO rate(user_id,product_id,value) VALUES(?,?,?)`;
  const data = [user_id, product_id, rate];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      message: `User with id=> ${user_id} rated product with id=>${product_id} ${rate} Stars`,
      result: result,
    });
  });
};

module.exports = { addRatingToProduct };
