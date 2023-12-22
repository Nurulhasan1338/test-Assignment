const mongose =require('mongoose');
const { Schema } = mongose;
const Transactionstate = new Schema({

ID:{
    type:Number,
},
   title:{
       type:String,
       required:true
   },
   description:{
       type:String,
       required:true
   },
   price:{
       type:Number,
       required:true
   },
   dateOfSale:{
       type:String,
       required:true,
   },
   category:{
    type:String,
    required:true
   },
   sold:{
    type:Boolean,
    required:true
   },
   image:{
    type:String,
    required:true
   },
   month:{
    type:Number,
    default:3
   }
  });

module.exports = mongose.model('transaction',Transactionstate);
