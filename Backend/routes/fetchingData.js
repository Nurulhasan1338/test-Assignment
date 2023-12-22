const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Transations = require("../module/transactions")
const pageSize = 10;




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


router.post("/search", async (req, res) => {
try {
  
  const transaction_data = await Transations.find();
 
  const page = Number(req.body.page);
  const Month = Number(req.body.month)

  result = await Transations.find({ month: Month })
 
  const startIndex = (page - 1)* pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = result.slice(startIndex, endIndex);

    res.json({
      data: paginatedData,
      currentPage: page,
      totalPages: Math.ceil(transaction_data.length/pageSize),
      perPage: pageSize,
    });
  
 
  

}  catch (error) {
    console.error(error);
    res.status(500).send("error in searching transaction");
}
});




module.exports = router;