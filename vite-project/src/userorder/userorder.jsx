import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store-cntxt'
import axios from 'axios'
import styles from './userorder.module.css'

function Userorder() {
    const [odrlist , setOdrlist] = useState([])
    const {token} = useContext(StoreContext)

    const handle_orders = async () => {
        try {
            const resp = await axios.post('http://localhost:5000/api/odr/getodr', {}, { headers: { token } });
            if (resp.data.success) {
                setOdrlist(prev => {
                    const updatedList = [...prev, ...resp.data.message];
                    console.log(updatedList); // Log the updated state here
                    return updatedList;
                });
            } else {
                console.log(resp.data.message);
            }
        } catch (e) {
            console.log(e);
        }
    };
    

    useEffect(()=>{
        handle_orders()
    } , [])
    let odr_num = 1
    return (
<div className={styles.order_container}>
  {odrlist.map((order, index) => (
    <div key={index} className={styles.order_block}>
      <h3 className={styles.ord_cnt}>Order: {odr_num++}</h3>
      {order.items && order.items.length > 0 && (
        order.items.map((item, subIndex) => (
          <div key={subIndex} className={styles.order_item}>
            <span>Item: {item.name}</span>
            <span>Amount: {item.quantity}</span>
          </div>
        ))
      )}      
      <p className={styles.order_total}>Status: {order.status}</p>
      <p className={styles.order_total}>Total: ${order.amount}</p>  
      <hr />
    </div>
  ))}
</div>

    
      );
      
      
}

export default Userorder