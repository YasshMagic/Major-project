const express = require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");


const listingConroller=require("../controllers/listing.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


router.route("/")
.get(wrapAsync(listingConroller.index))
.post(isLoggedIn,validateListing,
    wrapAsync(listingConroller.createListing)
);
// .post(upload.single('listing[image]'),(req,res)=>{
//     res.send(req.file);
// });
 //New Route
 router.get("/new",isLoggedIn,listingConroller.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingConroller.showListing))
.put(isLoggedIn,isOwner,validateListing,wrapAsync(listingConroller.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingConroller.destroyListing));

   
//Edit Route 

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingConroller.renderEditForm)
);


module.exports = router;