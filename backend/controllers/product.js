const connection = require("../models/db");

const getOneProductById = (req, res) => {
  const id = req.params.id;

  const query = `SELECT *,products.id FROM products
  INNER JOIN categories ON products.category_id=categories.id 
INNER JOIN brands ON products.brand_id=brands.id WHERE products.is_deleted=0 AND products.id=?`;

  const data = [id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.length) {
      return res.status(404).json({
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

const SearshGetAllProduct = (req, res) => {
  const query =
    "select *,products.id FROM products INNER JOIN categories ON products.category_id=categories.id INNER JOIN brands ON products.brand_id=brands.id WHERE products.is_deleted=0 ";
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
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

const getAllProduct = (req, res) => {
  const limit = 12;
  const page = req.query.page;
  const offset = (page - 1) * limit;
  const query =
    "select *,products.id FROM products INNER JOIN categories ON products.category_id=categories.id INNER JOIN brands ON products.brand_id=brands.id WHERE products.is_deleted=0  limit " +
    limit +
    " OFFSET " +
    offset;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }

    res.status(200).json({
      success: true,
      massage: "All products",
      products_page_count: result.length,
      page_number: page,
      result: result,
    });
  });
};

const getProductByCategory = (req, res) => {
  const category_id = req.params.id;

  const query = `SELECT *,products.id FROM products
  INNER JOIN categories ON products.category_id=categories.id 
INNER JOIN brands ON products.brand_id=brands.id WHERE products.is_deleted=0 AND products.category_id=?;`;
  const data = [category_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (result.length) {
      return res.status(200).json({
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
};

const getProductByBrand = (req, res) => {
  const brand_id = req.params.id;
  const query = `SELECT *,products.id FROM products
  INNER JOIN categories ON products.category_id=categories.id 
INNER JOIN brands ON products.brand_id=brands.id WHERE products.is_deleted=0 AND products.brand_id=?;`;
  const data = [brand_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (result.length) {
      return res.status(200).json({
        success: true,
        massage: `All the products for the brand: ${brand_id}`,
        result: result,
      });
    } else {
      res.status(404).json({
        success: false,
        massage: `The brand: ${brand_id} has no category `,
      });
    }
  });
};
const getAllCategory = (req, res) => {
  const query = `SELECT * FROM categories
 WHERE is_deleted=0;`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "All categories",
      result: result,
    });
  });
};

const filterGetAllCategories = (req, res) => {
  const query = `SELECT DISTINCT categoryName FROM categories INNER JOIN brands ON brands.category_id = categories.id
 WHERE categories.is_deleted=0  ;`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "All categories For Filter",
      result: result,
    });
  });
};

const getAllBrands = (req, res) => {
  const query = `SELECT * FROM brands
 WHERE is_deleted=0;`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "All brands",
      result: result,
    });
  });
};

const getBrandByCategory = (req, res) => {
  const category_id = req.params.id;
  const query = `SELECT * FROM brands WHERE category_id=?`;
  const data = [category_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: `SERVER ERROR IN NEW FUNC`,
        err: err,
      });
    }
    res.status(200).json({
      message: `ALL BRAND FOR CATG ${category_id}`,
      result: result,
    });
  });
};

const categoriesJoinedWithBrand = (req, res) => {
  const query = `SELECT *,categories.id FROM categories INNER JOIN brands ON categories.id = brands.category_id
 WHERE categories.is_deleted=0;`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "All categories with Brands",
      result: result,
    });
  });
};

module.exports = {
  getOneProductById,
  getAllProduct,
  getProductByCategory,
  getProductByBrand,
  getAllCategory,
  getAllBrands,
  getBrandByCategory,
  SearshGetAllProduct,
  filterGetAllCategories,
};
