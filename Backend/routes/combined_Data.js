const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Transactions = require("../module/transactions");
const axios = require('axios');

router.get("/", async (req, res) => {
try {

  const requestedMonth = Number(req.body.month);

    // Fetch data from three different APIs
    const res1 = await fetch('http://localhost:6000/summary/totalAmount',{
      method:'GET',
      body: JSON.stringify({
        "month":requestedMonth
      })
    });

    // const api2Response = await fetch.get('http://localhost:6000/summary/bardata');
    // const api3Response = await fetch.get('http://localhost:6000/summary/catagoriesdata');

    
    if(res1.ok) {
      const data1 = res1.json();
      res.json(data1);
    }else{
      throw {error:"cant fetch data"}
    }


    // const data2 = api2Response.json();
    // const data3 = api3Response.json();

    // Combine the data as needed
    // const combinedData = {
    //   totat_data : data1,
    //   bar_data : data2,
    //   pie_data : data3
    // };

}catch (error) {
    console.error(error);
    res.status(500).send("error in fetching transaction summary");
}
});


module.exports = router;