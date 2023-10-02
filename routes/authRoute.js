import express from "express";

import {
    registerController,
    LoginController,
    testControler,
    forgotPasswordController,
    updateProfileController,
} from "../controllers/authController.js";

import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { getOrderProductController } from "../controllers/ProductController.js";
//router object
const router = express.Router();

//routing
//Register || Method Post

router.post("/register", registerController);

//login ||Post

router.post('/Login',LoginController);
// forgot PassWord || Post
router.post('/forgot-password',forgotPasswordController)
//test 
router.get('/test',requireSignIn,isAdmin,testControler);

//protected Rout auth

router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});

//Proctecded Admin

router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
});
// ProfileRouter
router.put('/profile',requireSignIn,updateProfileController);
// Order Route
router.get('/order',requireSignIn,getOrderProductController);

export default router;
