import React from 'react';
import './widgetLg.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import {format} from "timeago.js"

const WidgetLg = () => {

  const Button = ({type})=>{
    return <button className={"widgetLgButton "+type}>{type}</button>
  }
  const [orders, setorders] = useState([]);
  
  useEffect(() => {
    const getorders = async ()=>{
      try {
        const res = await axios.get('orders',{headers : {
          token : "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },});
        setorders(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getorders();
  }, []);
  return (
    <div className='widgetLg'>
      <h3 className="widgetLgTitle">Latest Transactions</h3>
      <table className="widgetLgTable">
      <tbody>
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.map((order)=>
        <tr className="widgetLgTr" key={order._id}>
          <td className="widgetLgUser">
            <span className="widgetLgName">{order.userId}</span>
          </td>
          <td className="widgetLgDate">{format(order.createdAt)}</td>
          <td className="widgetLgAmount">${order.amount}</td>
          <td className="widgetLgStatus"><Button type={order.status} /></td>
        </tr>)}
        
         </tbody>
      </table>
    </div>
  );
}

export default WidgetLg;
