const connection = require("../models/db");

const addToOrders = (req, res) => {
  // Need To select All items in Cart , then add it , then deleted it from Cart
  const user_id = req.token.userId;
  const query = `INSERT INTO orders (user_id) VALUES(?)`;
  const date = [user_id];

  connection.query(query, date, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: `Server Error`,
        err: err,
      });
    }
    if (result.affectedRows) {
      const query = `SELECT * FROM cart INNER JOIN products ON products.id = cart.product_id INNER JOIN categories ON categories.id = products.category_id INNER JOIN brands ON brands.id = products.brand_id  WHERE cart.user_id=? AND cart.is_deleted=0 `;
      const data = [user_id];
      connection.query(query, data, (err, response) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err,
          });
        }
        if (response.length) {
          for (let i = 0; i < response.length; i++) {
            const query = `INSERT INTO orderInfo (user_id , order_id,product_id,quantityInCart) VALUES(?,?,?,?)`;
            const data = [
              user_id,
              result.insertId,
              response[i].product_id,
              response[i].quantityInCart,
            ];
            connection.query(query, data, (err, resp) => {
              if (err) {
                return res.json(err);
              }
            });
          }
          const query = `DELETE FROM cart WHERE user_id=?`;
          const data = [user_id];
          connection.query(query, data, (err, lastResult) => {
            if (err) {
              return res.status(500).json({
                message: `Fail To make Order Queries`,
                err: err,
              });
            }
            return res.status(201).json({
              success: true,
              message: `Order Added Successfully`,
            });
          });
        } else {
          res.status(403).json({
            message: `The Cart Is Empty`,
            result: result,
          });
        }
      });
    }
  });
};

module.exports = {
  addToOrders,
};
