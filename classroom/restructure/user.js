const express = require("express");
const router = express.Router(); //acquiring router to use in place of app


router.get("/", (req,res)=>{ //since app is not availaible here we use router functionality of express which does the same task
    res.send('get for user')
})

router.post("/:id", (req,res)=>{
    res.send("This is a post request")
})

router.delete("/:id", (req,res)=>{
    res.send('delete for user');
})

module.exports = router; //exporting all the router above