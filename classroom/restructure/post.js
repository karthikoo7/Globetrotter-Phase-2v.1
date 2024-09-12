
const express = require("express");
const router = express.Router();


router.get("/", (req,res)=>{
    res.send('get for posts')
})

router.post("/:id", (req,res)=>{
    res.send("This is a post request")
})

router.delete("/:id", (req,res)=>{
    res.send('delete for user');
})

module.exports = router;
