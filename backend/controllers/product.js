const connection = require("../models/db");
const getOneProductById = (req, res) => {
  const id = req.params.id;

  const query = `SELECT * FROM products
  INNER JOIN categories ON products.category_id=categories.id 
INNER JOIN brands ON products.brand_id=brands.id WHERE products.is_deleted=0`;
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
      massage: `The product of this  ${id}`,
      result: result,
    });
  });
};
const getAllProduct= (req, res) => {
  const query = `SELECT * FROM products
  INNER JOIN categories ON products.category_id=categories.id 
INNER JOIN brands ON products.brand_id=brands.id WHERE products.is_deleted=0`
;
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
        massage: "All products",
        result: result,
      });
    });
  };
 
  const  getProductByCategory=(req,res)=>{
    const category_id = req.params.id;

    const query = `SELECT * FROM products
    INNER JOIN categories ON products.category_id=categories.id 
  INNER JOIN brands ON products.brand_id=brands.id WHERE products.is_deleted=0`;
    const data = [category_id];
  
    connection.query(query, data, (err, result) => {
      if (err) {
        res.status(500).json({ err });
      }
      if (result.length) {
        res.status(200).json({
          success: true,
          massage: `All the products for the category: ${category_id}`,
          result: result,
        });
      } else {
        res.status(404).json({
          success: false,
          massage: `The category: ${category_id} has no category `,
        });
      }
    });
  }
  const  getProductByBrand=(req,res)=>{
    const brand_id = req.params.id;

    const query = `SELECT * FROM products
    INNER JOIN categories ON products.category_id=categories.id 
  INNER JOIN brands ON products.brand_id=brands.id WHERE products.is_deleted=0`;
    const data = [brand_id];
  
    connection.query(query, data, (err, result) => {
      if (err) {
        res.status(500).json({ err });
      }
      if (result.length) {
        res.status(200).json({
          success: true,
          massage: `All the products for the brandName: ${brand_id}`,
          result: result,
        });
      } else {
        res.status(404).json({
          success: false,
          massage: `The category: ${brand_id} has no brandName `,
        });
      }
    });
  }
module.exports = {
  getOneProductById,
  getAllProduct,
  getProductByCategory,
  getProductByBrand
};
