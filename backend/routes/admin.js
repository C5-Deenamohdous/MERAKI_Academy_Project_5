const express = require("express");

const adminRouter = express.Router();
const {createNewCategory,createNewBrand,addProduct,getAllusers,deleteUserById,deleteProductById,updateProductById} = require("../controllers/admin")



adminRouter.post("/create_category",createNewCategory);//!done
//http://localhost:5000/admin/create_category

// {
//     "categoryName": "404 STORE"
// }

adminRouter.post("/create_brand/:id",createNewBrand);//!done
// http://localhost:5000/admin//create_brand/2

// {
//     "brandName": "ahmad brand"
// }

adminRouter.post("/add_product",addProduct);//!done

//http://localhost:5000/admin/add_product

// {"title":"mac1","description":"macBook pro","productImage":"sss","price":"750JD",
// "quantity":"23","category_id":"1","brand_id":"1"}


adminRouter.get("/users",getAllusers);//!done

adminRouter.delete("/deleteUserById/:id",deleteUserById);//!done

adminRouter.delete("/deleteProductById/:id",deleteProductById);//!done


adminRouter.put("/updateProductById/:id",updateProductById);//!done



module.exports = adminRouter;
