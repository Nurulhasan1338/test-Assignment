import React ,{useEffect, useState,} from 'react'
import { FcApproval } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { FaSearch } from "react-icons/fa";
import { HiArrowCircleRight,HiArrowCircleLeft } from "react-icons/hi";

const Transactions = (props) => {

    
    const [page,setPage] = useState(1);
    const [trans,setTrans] = useState([]);

    const Fetch_data = async () => {
        try {
          const response = await fetch("http://localhost:3000/fetchAllTransaction/search", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "month": props.month,
              "page": page
            })
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const output = await response.json();
          setTrans(output.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };


    useEffect(()=>{
        Fetch_data(4,1);
    },[]);


    return (
        <>  
        <div className="container">
        <h1 className='display-3 text-center'> Transaction list </h1>

            <div className='row'>
                <div className="col-9 ">
                    <button type="submit" className ="btn btn-success" onClick={()=>{Fetch_data(props.month,1)}} ><FaSearch />Search</button>
                </div>
                <div className='col-3'>
                    <select className="form-select form-select-lg mb-3 bg-dark text-light" aria-label="Large select example" value={props.month} onChange={(e)=>{props.setMonth(e.target.value);}}>
                        <option value="1">January</option>
                        <option value="2">Febueary</option>
                        <option value="3">March</option>
                        <option value="4" >April</option>
                        <option value="5">MAY</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">december</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <table className="table-danger">
                        <thead>
                            <tr className='table-secondary'>
                                <th scope="col">Id</th>
                                <th scope="col">title</th>
                                <th scope="col">description</th>
                                <th scope="col">price</th>
                                <th scope="col">category</th>
                                <th scope="col">sold</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                             trans.map((item,index)=>{
                            return (
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td>{item.sold?<FcApproval />:<FcCancel />}</td>
                                <td><img src={item.image} alt="product_image"/></td>
                            </tr>
                            )})}
                        </tbody>
                    </table>
                </div>

            </div>
            <div className="row mt-3 border-top py-4">
                <div className="col-4">Page no.: {page}</div>
                <div className="col-4 text-center">
                    <button className={`btn btn-secondary btn-sm mx-2 ${page===1?"disabled":""}`} onClick={()=>{setPage(page-1);Fetch_data()}}><HiArrowCircleLeft />previous</button>
                    <button className='btn btn-secondary btn-sm mx-2' onClick={()=>{setPage(page+1);Fetch_data()}}>Next<HiArrowCircleRight /></button>
                </div>
                <div className="col-4 text-end" > Per Page : {trans.length}</div>
            </div>
        </div>
        </>
    )
}

export default Transactions;
