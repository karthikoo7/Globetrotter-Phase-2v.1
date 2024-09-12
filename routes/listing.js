//restructuring code and connected to app.js

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js"); //requiring joi schema for server side validations
const Listing = require("../models/listing.js");// *enter proper address.

//joi serverside validation 
const validateListing = (req, res, next) => { 
    let { error } = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
      next();
    }
};

//Index route
router.get("/", wrapAsync(async(req,res)=>{

    let allListings = await Listing.find();
    res.render("./listings/index.ejs",{ allListings }); 
})) 


//Create Route {must place above show route or shows error due to confusion in addreses}
router.get("/new", (req,res)=>{
    res.render("./listings/new.ejs");
})


//Submitting new listing (POST).
router.post("/", 
   // validateListing, //server side validation joi middleware.
    wrapAsync(async(req,res,next)=>{ 
    const newListing = new Listing(req.body.listings);
    await newListing.save();
    req.flash("success", "Listing Added Successfully!!");
    res.redirect("/listings");

}))


//Show Route
router.get("/:id", wrapAsync(async(req,res)=>{
    let{ id } = req.params;
    let listing = await Listing.findById(id).populate("reviews"); //used to send the whole object of reviews instead of tjust the id
    if(!listing){
        req.flash("error", " The listing you requested for, does not Exist!");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listing });

}))


//Edit Route
router.get("/:id/edit", async(req,res)=>{

    let{ id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", " The listing you requested for, does not Exist!");
        res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", {listing});
})


//Update route
router.put("/:id", wrapAsync(async(req,res)=>{
   
    let{ id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listings}, //deconstructing to get separate values from the form using'...'
        //{runValidators:true, new: true} experimenting
    );
    req.flash("success", "Listing Updated Successfully!!");
    res.redirect("/listings");
}))


//Destroy Route
router.delete("/:id", wrapAsync(async(req,res)=>{
    let{ id } = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted Successfully!!");
    console.log(deletedList);
    res.redirect("/listings");
}))

module.exports = router;


/*
wrapAsync is a custom error handling function replacing try and catch block but serving the same function.
new method of getting data from ejs in the form of object instance
it is done here to deal with the error encountered when an empty post request is sent and tried to save on the db
*/