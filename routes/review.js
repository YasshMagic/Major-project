const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js")

const reviewConroller=require("../controllers/review.js");



//Post Review Route

router.post("/",isLoggedIn,validateReview,wrapAsync(reviewConroller.createReview)
);

//Delete Review Route

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewConroller.destroyReview)
);

module.exports = router;
