const connection = require("../models/db");

const addToOrders = (req, res) => {
  // Need To select All items in Cart , then add it , then deleted it from Cart .......
  const user_id = req.token.userId;
  const user_Cartid = req.token.userId;

  const query = `SELECT * FROM cart INNER JOIN products ON products.id = cart.product_id INNER JOIN categories ON categories.id = products.category_id INNER JOIN brands ON brands.id = products.brand_id  WHERE cart.user_id=? AND cart.is_deleted=0 `;

  const data = [user_id, user_Cartid];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    if (result.length) {
      for (let i = 0; i < result.length; i++) {
        const query = `INSERT INTO orders (userCart_id , TEST) VALUES(?,?)`;
        const data = [user_Cartid, result[i].title];
        connection.query(query, data, (err, result) => {
          if (err) {
            return res.json(err);
          }
        });
      }
      res.json(result);
    } else {
      res.status(403).json({
        message: `The Cart Is Empty`,
        result: result,
      });
    }
  });
};

module.exports = {
  addToOrders,
};

