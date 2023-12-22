// PriceChart.js
import React, { useState,useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const PriceChart = (props) => {
 
    const [bar,setBar] = useState({});

    const Fetch_data_bar = async () => {
        try {
          const response = await fetch("http://localhost:3000/summary/bardata", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "month": props.month,
            })
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const output = await response.json();
          console.log(output);
          setBar(output);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };


    useEffect(()=>{
        Fetch_data_bar();
    },[]);
  const priceRanges = [
    '0-100', '101-200', '201-300', '301-400', '401-500',
    '501-600', '601-700', '701-800', '801-900', '901-above'
  ];

   const dataValues = Object.values(bar);

  const data = {
    labels: priceRanges,
    datasets: [{
      label: 'Price Range Distribution',
      data: dataValues,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
      },
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Price Range Distribution</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PriceChart;
