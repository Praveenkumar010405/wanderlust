const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validatelisting}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

//index route
router.get("/", wrapAsync(listingController.index));

//new route
router.get("/new",isLoggedIn,(listingController.new))

//show route
router.get("/:id", wrapAsync(listingController.show))

//create route
router.post("/", isLoggedIn, validatelisting, upload.single('listing[image]'), wrapAsync(listingController.create))

//edit route
router.get("/:id/edit", isLoggedIn, isOwner,wrapAsync(listingController.edit))

//update route
router.put("/:id",isLoggedIn, isOwner,validatelisting,upload.single('listing[image]'), wrapAsync(listingController.update))

//delete route
router.delete("/:id",isLoggedIn, isOwner, wrapAsync(listingController.delete))


module.exports=router;