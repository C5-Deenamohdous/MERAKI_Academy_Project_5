const connection = require("../models/db");


const /* A function that creates a new category. */
createNewCategory =(req, res)=>{
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
}


/* A function that creates a new brand. */
const createNewBrand =(req, res)=>{
    const id = req.params.id;
    const { brandName } = req.body;
    const query = `INSERT INTO brands (brandName,category_id) VALUES (?,?);`;
    const data = [brandName,id];

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
}


const /* A function that creates a new product. */
addProduct =(req, res)=>{
    const { title,description,productImage,price,quantity,category_id,brand_id } = req.body;
    const query = `INSERT INTO products (title,description,productImage,price,quantity,category_id,brand_id) VALUES (?,?,?,?,?,?,?);`;
    const data = [title,description,productImage,price,quantity,category_id,brand_id];

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
}



module.exports={createNewCategory,createNewBrand,addProduct};