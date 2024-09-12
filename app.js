//require necessary packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");

//Mongo COnnection
const MONGO_URL = "mongodb://127.0.0.1:27017/globetrotter";
main()
.then(()=>{
    console.log('Connected.');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}


const sessionOption = {
    secret:"mysercretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7 *24 *60*60*100, //setting expiry of cookie storing info 
        maxAge: 7 *24 *60*60*100,
        httpOnly:true, //to prevent aginst cross-scripting attacks
    },
}

app.use(methodOverride("_method"));//for method overrride usage
app.set("views", path.join(__dirname,"views"));//for ejs
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true})); // to parse the data received
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);//for ejsmate
app.use(session(sessionOption));


app.use(flash());
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

app.get("/", (req,res)=>{
    res.send("I am Groot.");
})



const listings = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");




app.use("/listings", listings); //connections from router
app.use("/listings/:id/reviews", reviews);


//Error handling middleware.
app.use((err,req,res, next) =>{
    let { statusCode= 404 , message = "PAGE NOT FOUND "} = err; //DEFAULT values 
    res.render("error.ejs", { message });
    next();
})


//passes error of all types with wrong url to error handling.
app.use("*", ( err, req,res,next)=>{
    throw new ExpressError(404, "PAGE NOT FOUND");
})

app.listen(8080, (req,res)=>{
    console.log("Port 8080 is Online.");
})