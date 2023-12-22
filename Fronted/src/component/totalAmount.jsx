import React, { useState, useEffect} from 'react';
import PieChart from "./priceChart";

const TotalAmount = (props) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [data,setData] = useState({});

  const [page,setPage] = useState(1);
    const [trans,setTrans] = useState([]);

    const Fetch_Total_data = async () => {
        try {
          const response = await fetch("http://localhost:3000/summary/totalAmount", {
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
          console.log(output)
          setData(output);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };


    useEffect(()=>{
      Fetch_Total_data();
    },[props.month]);

  return (
    <div className='container mt-4'>
      <h1>Statistics - {months[props.month-1]}</h1>
      <div className="m-2">
      <table className="table">
  <thead>
    <tr>
      <th scope="col">catagory</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TotalAmount</td>
      <td>{data.totalAmount}</td>
    </tr>
    <tr>
      <td>Total Sold</td>
      <td>{data.totalSold}</td>
    </tr>
    <tr>
      <td>Total not Sold</td>
      <td>{data.totalNotSold}</td>
    </tr>
  </tbody>
</table>
      </div>

 

    </div>
  )
}

export default TotalAmount;
