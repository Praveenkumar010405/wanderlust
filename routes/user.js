const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync");
const User=require("../models/user.js");
const passport=require("passport");
const { saveredirecturl } = require("../middleware.js");

const userController=require("../controllers/users.js");


//get signup form
router.get("/signup",(userController.signupForm))

//signup post
router.post("/signup", wrapAsync(userController.signupPost));


//login form
router.get("/login",(userController.loginForm))

//post login
router.post("/login",saveredirecturl,
    passport.authenticate("local",{
        failureRedirect: "/login",
        failureFlash:true,
    }),
    (userController.loginPost)
);

//logout route
router.get("/logout",(userController.logout))

module.exports=router;