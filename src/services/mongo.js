require('dotenv').config()
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI

try {
    mongoose.connect(uri);
    console.log("Mongoose Connected")
  } catch (error) {
    console.error(error)
  }
module.exports = mongoose;
