const connection = require("../models/db");

const /* A function that creates a new category. */
    createNewCategory = (req, res) => {
        const { categoryName } = req.body;
        const query = `INSERT INTO categories (categoryName) VALUES (?);`;
        const data = [categoryName];

        connection.query(query, data, (err, result) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    massage: "Server error",
                    err: err,
                });
            }
            res.status(201).json({
                success: true,
                massage: `${categoryName} created`,
                result: result,
            });
        });
    };

/* A function that creates a new brand. */
const createNewBrand = (req, res) => {
    const id = req.params.id;
    const { brandName } = req.body;
    const query = `INSERT INTO brands (brandName,category_id) VALUES (?,?);`;
    const data = [brandName, id];

    connection.query(query, data, (err, result) => {
        if (err) {
            res.status(500).json({
                success: false,
                massage: "Server error",
                err: err,
            });
        }
        res.status(200).json({
            success: true,
            massage: `${brandName} created`,
            result: result,
        });
    });
};

const /* A function that creates a new product. */
    addProduct = (req, res) => {
        const {
            title,
            description,
            productImage,
            price,
            quantity,
            category_id,
            brand_id,
        } = req.body;
        const query = `INSERT INTO products (title,description,productImage,price,quantity,category_id,brand_id) VALUES (?,?,?,?,?,?,?);`;
        const data = [
            title,
            description,
            productImage,
            price,
            quantity,
            category_id,
            brand_id,
        ];

        connection.query(query, data, (err, result) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    massage: "Server error",
                    err: err,
                });
            }
            res.status(200).json({
                success: true,
                massage: "product created",
                result: result,
            });
        });
    };
const /* Getting all the users from the database. */
    getAllusers = (req, res) => {
        const query = `SELECT * FROM users WHERE is_deleted=0;`;
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
                massage: "All the users",
                result: result,
            });
        });
    };

const /* Deleting the user with the given id. */
    deleteUserById = (req, res) => {
        const id = req.params.id;

        const query = `UPDATE users SET is_deleted=1 WHERE id=?;`;

        const data = [id];

        connection.query(query, data, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    massage: "Server Error",
                    err: err,
                });
            }
            if (!result.changedRows) {
                return res.status(404).json({
                    success: false,
                    massage: `The user: ${id} is not found`,
                    err: err,
                });
            }
            res.status(200).json({
                success: true,
                massage: `Succeeded to delete user with id: ${id}`,
                result: result,
            });
        });
    };

const /* Deleting the product with the given id. */
    deleteProductById = (req, res) => {
        const id = req.params.id;

        const query = `UPDATE products SET is_deleted=1 WHERE id=?;`;

        const data = [id];

        connection.query(query, data, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    massage: "Server Error",
                    err: err,
                });
            }
            if (!result.changedRows) {
                return res.status(404).json({
                    success: false,
                    massage: `The product: ${id} is not found`,
                    err: err,
                });
            }
            res.status(200).json({
                success: true,
                massage: `Succeeded to delete product with id: ${id}`,
                result: result,
            });
        });
    };

const updateProductById = (req, res) => {
    const {
        title,
        description,
        productImage,
        price,
        quantity,
        category_id,
        brand_id,
    } = req.body;
    const id = req.params.id;
    const istitle = title ? true : false;
    const isdescription = description ? true : false;
    const isproductImage = productImage ? true : false;
    const isprice = price ? true : false;
    const isquantity = quantity ? true : false;
    const iscategory_id = category_id ? true : false;
    const isbrand_id = brand_id ? true : false;
console.log( istitle,
    isdescription,
    isproductImage,
    isprice);
    const query = `UPDATE products SET 
    title=IF(${istitle},?,title),
    description=IF(${isdescription},?,description),
    productImage=IF(${isproductImage},?,productImage),
    price=IF(${isprice},?,price),
    quantity=IF(${isquantity},?,quantity),
    category_id=IF(${iscategory_id},?,category_id),
    brand_id=IF(${isbrand_id},?,brand_id) 
    WHERE id=?;`;
    const data = [
        title,
        description,
        productImage,
        price,
        quantity,
        category_id,
        brand_id,
        id];

    connection.query(query, data, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                massage: "server err",
                err: err,
            });
        }
        if (!result) {
            return res.status(404).json({
                success: false,
                massage: `there is no  product whith id: ${id} `,
                err: err,
            });
        }
        if (!result.changedRows) {
            return res.status(404).json({
                success: false,
                massage: `there is no changes to the product id: ${id} `,
                err: err,
            });
        }

        res.status(200).json({
            success: true,
            massage: `Succeeded to update product with id: ${id}`,
            result: result,
        });
    });
};

module.exports = {
    createNewCategory,
    createNewBrand,
    addProduct,
    getAllusers,
    deleteUserById,
    deleteProductById,
    updateProductById,
};
