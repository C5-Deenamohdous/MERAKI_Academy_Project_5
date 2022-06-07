const connection = require("../models/db");

const addToOrders = (req, res) => {
  // Need To select All items in Cart , then add it , then deleted it from Cart
  const user_id = req.token.userId;
  const query = `INSERT INTO orders (user_id) VALUES(?)`;
  const date = [user_id];
console.log(user_id);
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
///=   const order_id req.params.id .
const getAllOrders = (req, res) => {
  const query = `SELECT * FROM orders`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(200).json({
      success: true,
      message: `All Orders`,
      result: result,
    });
  });
};

const getAllOrdersWithDetails = (req, res) => {
  const query = `SELECT *,orders.id FROM orders INNER JOIN orderInfo ON orderInfo.order_id = orders.id
 INNER JOIN products ON products.id = orderInfo.product_id INNER JOIN categories ON categories.id = products.category_id INNER JOIN brands ON brands.id = products.brand_id WHERE orders.orderStatus = 0 AND orders.is_deleted=0`;

  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      message: `All Orders`,
      result: result,
    });
  });
};

// Admin to get One Order Details ,
const getOneOrderDetail = (req, res) => {
  const order_id = req.params.id;
  const query = `SELECT *,orders.id FROM orders 
INNER JOIN orderInfo ON orderInfo.order_id =orders.id
INNER JOIN products ON products.id = orderInfo.product_id 
INNER JOIN categories ON categories.id = products.category_id 
INNER JOIN brands ON brands.id = products.brand_id
INNER JOIN users ON users.id = orders.user_id
WHERE orders.is_deleted=0 AND orders.id=?`;
  const data = [order_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      result: result,
    });
  });
};

//== to sort Completed and not completed orders ,, (in Admin Panel ,, )

const completedOrders = (req, res) => {
  const query = `SELECT * FROM orders WHERE orderStatus = 1`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      message: `Completed Orders`,
      result: result,
    });
  });
};

//unCompletedOrders ,
const unCompletedOrders = (req, res) => {
  const query = `SELECT * FROM orders WHERE orderStatus = 0`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      message: `UnCompleted Orders`,
      result: result,
    });
  });
};

const getAllOrdersByUser = (req, res) => {
  const user_id = req.params.id;
  const query = `SELECT * FROM orders WHERE user_id=?`;
  const data = [user_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `SERVER ERROR`,
      });
    }
    res.status(200).json({
      success: true,
      result: result,
    });
  });
};

const getAllCompletedOrdersByUser = (req, res) => {
  const user_id = req.params.id;
  const query = `SELECT *,orders.id FROM orders WHERE user_id=? AND orderStatus = 1 `;
  const data = [user_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `SERVER ERROR`,
      });
    }
    res.status(200).json({
      success: true,
      result: result,
    });
  });
};

const getAllUnCompletedOrdersByUser = (req, res) => {
  const user_id = req.params.id;
  const query = `SELECT * FROM orders WHERE user_id=? AND orderStatus = 0 `;
  const data = [user_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `SERVER ERROR`,
      });
    }
    res.status(200).json({
      success: true,
      result: result,
    });
  });
};

module.exports = {
  addToOrders,
  getAllOrders,
  getAllOrdersWithDetails,
  getOneOrderDetail,
  unCompletedOrders,
  completedOrders,
  getAllOrdersByUser,
  getAllCompletedOrdersByUser,
  getAllUnCompletedOrdersByUser,
};
