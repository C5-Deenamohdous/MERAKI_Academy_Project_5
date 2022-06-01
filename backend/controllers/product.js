const connection = require("../models/db");
const getOneProductById = (req, res) => {
  const id = req.params.id;

  const query = `SELECT * FROM products INNER JOIN categories ON products.category_id=categories.id WHERE products.id=? AND products.is_deleted=0;`;
  const data = [id];

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
        massage: "The product is Not Found",
      });
    }
    res.status(200).json({
      success: true,
      massage: `The product  ${data}`,
      result: result,
    });
  });
};

module.exports = {
  getOneProductById,
};
