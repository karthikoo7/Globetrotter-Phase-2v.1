const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/globetrotter";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => { //async function 
  await Listing.deleteMany({}); //deletes any old data ffrom db collections
  await Listing.insertMany(initData.data);//inserts new data from data.js
  console.log("data was initialized");
};

initDB();//function called once to initialize database for our website.