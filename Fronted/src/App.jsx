import { useState } from 'react'
import Transactions from './component/transactions'
import TotalData from "./component/totalAmount"
import './App.css'

function App() {

  const [month,setMonth] = useState(3);
   


  return (
    <>
   <Transactions month ={month} setMonth ={setMonth}></Transactions>
  <TotalData month={month} ></TotalData>


    </>
  )
}

export default App
