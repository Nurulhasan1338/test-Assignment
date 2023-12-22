const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Transation = require("../module/transactions")
 
const data = [
    {
    "id": 1,
    "title": "Fjallraven  Foldsack No 1 Backpack Fits 15 Laptops",
    "price": 329.85,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop up to 15 inches in the padded sleeve your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "sold": false,
    "dateOfSale": "2021-11-27T20:29:54+05:30"
    }
]


router.get('/', async (req, res) => {

    try {
    const response = await fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
      var Transaction_json = await response.json();
      Transaction_json.map(item => {
        const modifiedDate = new Date(item.dateOfSale); 
        const getmonth = modifiedDate.getMonth() + 1; 
        const updated = new Transation({
            ID: item.id, 
            title: item.title,
            price: item.price,
            description: item.description,
            category: item.category,
            image: item.image,
            sold: item.sold,
            dateOfSale: item.dateOfSale,
            month: getmonth
        });
        updated.save();
      });
      res.status(200).json({ message: 'Database initialized with modified data.' });
    } catch (error) {
      console.error('Error in initializing database:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router;