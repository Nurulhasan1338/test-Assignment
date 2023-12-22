const mongoose=require('mongoose');
require('dotenv').config();

const connectToMongo = async() => {
    
  mongoose.connect(process.env.MONGO_URI);
  console.log("connect to mongo successfully!!");
}


module.exports = connectToMongo;



