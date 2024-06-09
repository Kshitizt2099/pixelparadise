const express=require('express');
const router=express.Router();
const {LogIn,SignIn}=require('../controllers/UsersController/UserController');
const { jwtAuth } = require('../config/jwtAuth');
const { createTable, createFavTable,createCartTable, createProduct, getProducts, getDetails, insertintocart, getcart, deletetable, incqtycart, decqtycart, deletecart } = require('../controllers/ProductController/productController');
const { uploads } = require('../config/multer');
//User and Authentication Routes
router.post("/login",LogIn);
router.post("/signIn",SignIn);

//productsController
router.get("/products",jwtAuth,getProducts);
// (req,res)=>{
//     console.log("file",req.files.poster[0].filename,req.files.video[0].filename);
//     console.log("body",req.body.title);
//     res.status(201).send({msg:"Padhle Padhle"})
// } 
router.post("/createproduct",uploads.fields([
    { name: 'poster', maxCount: 1 }, // Configuration for the poster image field
    { name: 'video', maxCount: 1 }   // Configuration for the video field
]),createProduct);


router.get("/details/:id",getDetails);
router.post("/incart",insertintocart);
router.get("/getcart/:id",getcart)
router.delete("/delete/:name",deletetable)
router.put("/create",createCartTable)
router.get("/pluscart/:id/:user_id",incqtycart);
router.get("/minuscart/:id/:user_id",decqtycart);
router.get("/deletecart/:id/:user_id",deletecart);
module.exports=router;

