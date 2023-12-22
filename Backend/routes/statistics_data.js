const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Transactions = require("../module/transactions");

const all_data = {};


router.post("/totalAmount", async (req, res) => {
try {

  const requestedMonth = Number(req.body.month);
  
   const salesAmout = await Transactions.aggregate([
        {
          $match: {month:requestedMonth}
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$price" }
          }
        }
      ])

    const solditems  = await Transactions.aggregate([
        {
          $match: {
            month: requestedMonth, 
            sold: true
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: 1 }
          }
        }
      ]);

    const notSolditems  = await Transactions.aggregate([
        {
          $match: {
            month: requestedMonth, 
            sold: false
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: 1 }
          }
        }
      ])
      
      all_data["api_1"] = {
          totalAmount:salesAmout[0].total,
          totalSold:solditems[0].total,
          totalNotSold:notSolditems[0].total
          
      };  
     res.json(all_data.api_1)
      

}catch (error) {
    console.error(error);
    res.status(500).send("error in fetching transaction summary");
}

});


router.get("/bardata", async (req, res) => {
  try {
  
    const requestedMonth = Number(req.body.month);


    const bardistribution = {
      '0-100':0, 
      '101-200':0, 
      '201-300':0, 
      '301-400':0, 
      '401-500':0, 
      '501-600':0, 
      '601-700':0, 
      '701-800':0,
      '801-900':0,
      '901-above':0
    }
  const desiredMonth = Number(req.body.month);
  const data = await Transactions.aggregate([
    {
      $match: {
        month: desiredMonth
      }
    },
    {
      $group: {
        _id: {
          $switch: {
            branches: [
              { case: { $and: [{ $gte: ['$price', 0] }, { $lte: ['$price', 100] }] }, then: '0-100' },
              { case: { $and: [{ $gte: ['$price', 101] }, { $lte: ['$price', 200] }] }, then: '101-200' },
              { case: { $and: [{ $gte: ['$price', 201] }, { $lte: ['$price', 300] }] }, then: '201-300' },
              { case: { $and: [{ $gte: ['$price', 301] }, { $lte: ['$price', 400] }] }, then: '301-400' },
              { case: { $and: [{ $gte: ['$price', 401] }, { $lte: ['$price', 500] }] }, then: '401-500' },
              { case: { $and: [{ $gte: ['$price', 501] }, { $lte: ['$price', 600] }] }, then: '501-600' },
              { case: { $and: [{ $gte: ['$price', 601] }, { $lte: ['$price', 700] }] }, then: '601-700' },
              { case: { $and: [{ $gte: ['$price', 701] }, { $lte: ['$price', 800] }] }, then: '701-800' },
              { case: { $and: [{ $gte: ['$price', 801] }, { $lte: ['$price', 900] }] }, then: '801-900' },
              { case: { $gte: ['$price', 901] }, then: '901-above' },
            ],
            default: 'Unknown'
          }
        },
        count: { $sum: 1 } 
      }
    }
  ])

  data.map(item=>{
    bardistribution[item._id] = item.count;
  })

  all_data["api_2"] = bardistribution
res.json(all_data.api_2);

  }catch(err){
    res.status(500).send("error in fetchhing bar data")
  }


});


router.get("/catagoriesdata", async (req, res) => {
  try {
  
    const requestedMonth = Number(req.body.month);

  const desiredMonth = Number(req.body.month);

  const data = await Transactions.aggregate([
    {
      $match: {
        month: desiredMonth
      }
    },
    {
      $group: {
        _id: '$category',
        itemCount: { $sum: 1 }
      }
    }
  ])

  all_data["api_3"] = data;

res.json(all_data.api_3);

  }catch(err){
    res.status(500).send("error in fetchhing bar data")
  }


});





module.exports = router;