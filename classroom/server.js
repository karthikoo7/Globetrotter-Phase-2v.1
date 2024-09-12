const express = require("express");
const app = express();
//const cookieParser = require("cookie-parser");
const user = require("./restructure/user"); //requiring file routes
const post = require("./restructure/post");
const session = require("express-session");
const path = require("path");
const flash = require('connect-flash'); //to display a temp. message to a user once, an action is performed for ex : on deletiion or signup


const sessionOptions = {
    secret:"mysupersecretcode",
    saveUninitialized:true, //to get rid of some warnings
    resave:false    
}

app.use(session(sessionOptions));//simplifying the statement
app.set("views", path.join(__dirname,"views"));//for ejs
app.set("view engine", "ejs");
app.use(flash());

app.use((req,res,next)=>{ //simple way to make the routes less bulky, allows values to be used in ejs
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("errors");
    next();
})

//simple excercise to learn about storing info and using in a single session betweenn multiple addresses.
app.get("/register", (req,res)=>{
    let { name = "anonymous" } = req.query;//getting value of name from query entered in serrach bar /register?name=karthik
    req.session.name = name;
    if( name == "anonymous" ){
        req.flash("errors", "Registration Failed!!!");
    } else{
       
        req.flash("success", "Registration Successful!!"); //key-value pair
    }
    res.redirect("/hello");
})

app.get("/hello", (req,res)=>{
    res.render("page.ejs",{ name:req.session.name });
})













/*
app.get("/reqcount", (req,res)=>{
    if(req.session.count){  //checking the reqcount in a single session between each client-server interaction
        req.session.count++;
    }
    else{
        req.session.count = 1;
    }
    res.send(`Your count is ${req.session.count} times`);
})

app.get("/test", (req,res)=>{
    res.send("Testing");
})
*/
















app.listen(3000, () =>{
    console.log("The server is live");
})






















/* this is here is a simple example demonstrating how to restrcuture a code into modules that serve
a similar function in to little parts to avoid bloating a single file with all the code regarding a website.*/

/*
app.use(cookieParser("secretcode")); //to get cookie value from req (secretcode) acts as a encryting value for signed cookies


app.use("/users", user ); // using the common address values and matching them to files 
app.use("/posts",post );

app.get("/getsigned", (req,res)=>{

    res.cookie("madein", "India" , {signed:true}); //signed cookies help verigy aginsst tampering of cookie
    res.send("got you cookie?");
})

app.get("/verify", (req,res)=>{

    console.dir(req.signedCookies);//to view signed cookies
    res.send("verified?");
})


app.get("/name", (req,res)=>{ //to understand the use of cookie and exchange of data .
    let { name = 'anonomous' } = req.cookies; //we may add name-value in application or use default of anonmous
    res.send(`HI, ${name}`);
})

app.get("/getcookies", (req,res)=>{ // read on wiki about HTTP cookie
    res.cookie("greet", "helloworld"); //cookie sent from the server stored by web browser contains key-value pair

    res.send("Check inspect < Application fro cookie");
})


app.get("/", (req,res)=>{
    console.dir(req.cookies);
    res.send("hi, i am root");
})


*/