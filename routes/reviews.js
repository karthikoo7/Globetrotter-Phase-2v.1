const express = require("express");
const router = express.Router({mergeParams:true}); //in order to solve conflicting params issue between parent and child address
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");// *enter proper address.
const Review = require("../models/review.js");




const validateReview = (req, res, next) => { 
    let { error } = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
      next();
    }
};

// Review route-post
router.post("/", 
    //validateReview, 
    wrapAsync(async(req,res) =>{

    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "Review Added Successfully!!");

    res.redirect(`/listings/${listing.id}`);
}));


//Destroy route for review
router.delete("/:reviewsId", wrapAsync(async(req,res)=>{
    let { id, reviewsId } = req.params;

    await Listing.findByIdAndUpdate(id,{$pull:{ review:reviewsId }}); 
    await Review.findByIdAndDelete(reviewsId);

    res.redirect(`/listings/${id}`)
}))

module.exports = router;

//research $pull(used to pull and remove the instance of the value from the object)