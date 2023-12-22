const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Transations = require("../module/transactions")




router.get("/alltransactions", async (req, res) => {
try {
 const transaction_data = await Transations.find();
 if(transaction_data.length!==0){
  res.json({"data":transaction_data});
 }
 else{
  res.status(404).send("No transaction found");
 }
}  catch (error) {
    console.error(error);
    res.status(500).send("error in fetching all transaction");
}
});



router.get("/search", async (req, res) => {
try {
  
  const transaction_data = await Transations.find();
  const parameter = req.body.parameter;
  const value = req.body.value;
  const page = Number(req.body.page);

  result = transaction_data;

  if(parameter){
    result = await Transations.find({ [parameter]: value })
    res.json(result);
  }else{

  const pageSize = 10;
  const startIndex = (page - 1)* pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = result.slice(startIndex, endIndex);

    res.json({
      data: paginatedData,
      currentPage: page,
      totalPages: Math.ceil(transaction_data.length / pageSize),
      perPage: pageSize,
    });
  
 
  }

}  catch (error) {
    console.error(error);
    res.status(500).send("error in searching transaction");
}
});




module.exports = router;