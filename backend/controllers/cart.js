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

const getUserCart = (req, res) => {
  const user_id = req.token.userId;

  const query = `SELECT * FROM cart INNER JOIN products ON products.id = cart.product_id INNER JOIN categories ON categories.id = products.category_id INNER JOIN brands ON brands.id = products.brand_id  WHERE cart.user_id=? AND cart.is_deleted=0 `;

  const data = [user_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    if (result.length) {
      return res.status(200).json({
        success: true,
        message: `All Product in Cart For The User with id => ${user_id}`,
        result: result,
      });
    } else {
      res.status(403).json({
        message: `The Cart Is Empty`,
        result: result,
      });
    }
  });
};

module.exports = {
  addToCart,
  getUserCart,
};
