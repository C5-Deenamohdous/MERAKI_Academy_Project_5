const connection = require("../models/db");

const addToCart = (req, res) => {
  const user_id = req.token.userId;
  const product_id = req.params.id;

  const query = `INSERT INTO cart(user_id,product_id) VALUES(?,?)`;
  const data = [user_id, product_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    if (result.affectedRows) {
      res.status(201).json({
        success: true,
        message: `Product with id ${product_id} Added To Cart`,
        result: result,
      });
    }
  });
};



module.exports = {
  addToCart,
};
