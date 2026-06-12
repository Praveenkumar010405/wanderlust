const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

if(process.env.NODE_ENV != "Production"){
  require("dotenv").config();
}

const MONGO_URL = process.env.ATLASDB_URL || process.env.MONGO_URI;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  if(!MONGO_URL){
    throw new Error("ATLASDB_URL is not defined in .env");
  }
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,owner:'6a15cd26ce4a2d9a8ea76ac0'}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
