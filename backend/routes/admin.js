/* Importing the express module. */
const express = require("express");

const adminRouter = express.Router();

/* Importing the functions from the admin.js file. */
const {
  createNewCategory,
  createNewBrand,
  addProduct,
  getAllusers,
  deleteUserById,
  deleteProductById,
  updateProductById,
} = require("../controllers/admin");

/* A post request that is used to create a new category. */
adminRouter.post("/create_category", createNewCategory); //!done
//http://localhost:5000/admin/create_category
// {
//     "categoryName": "404 STORE"
// }

/* A post request that is used to create a new brand. */
adminRouter.post("/create_brand/:id", createNewBrand); //!done
// http://localhost:5000/admin//create_brand/2
// {
//     "brandName": "ahmad brand"
// }

/* A post request that is used to add a new product to the database. */
adminRouter.post("/add_product", addProduct); //!done

//http://localhost:5000/admin/add_product
// {"title":"mac1","description":"macBook pro","productImage":"sss","price":"750JD",
// "quantity":"23","category_id":"1","brand_id":"1"}

/* AdminRouter is a router that is used to handle all the admin routes. */
adminRouter.get("/users", getAllusers); //!done
/* Deleting a user by id. */
adminRouter.delete("/delete_user/:id", deleteUserById); //!done
/* Deleting a product by id. */
adminRouter.delete("/delete_product/:id", deleteProductById); //!done
/* Updating a product by id. */
adminRouter.put("/update_product/:id", updateProductById); //!done

/* Exporting the adminRouter to be used in the app.js file. */

module.exports = adminRouter;
