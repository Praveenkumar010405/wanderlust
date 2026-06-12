const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validatereview, isLoggedIn, isreviewAuthor}=require("../middleware.js");

const reviewController=require("../controllers/reviews.js");



//reviews routes jo listing m h
//post route
router.post("/", isLoggedIn, validatereview, wrapAsync(reviewController.post))

//delete review route
router.delete("/:reviewId",isLoggedIn, isreviewAuthor, wrapAsync(reviewController.delete))

module.exports=router;