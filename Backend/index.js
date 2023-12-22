
const PORT = 6000;
const connectToMongo = require('./db');
const cors = require('cors')
const express = require('express')
connectToMongo();  
const app = express()

app.use(cors());
app.use(express.json());


app.use('/Initialisedatabase',require('./routes/intialise'));
app.use('/fetchAllTransaction',require('./routes/fetchingData'));
app.use('/summary',require('./routes/statistics_data'));
app.use('/combined_data',require('./routes/combined_Data'));

app.get('*',(req,res)=>{
  res.status(200).json({
    message:'connected successfully'
  })

  
})

app.listen(PORT,()=>{
  console.log(`sever is listening at :https://localhost:${PORT}`);
});



