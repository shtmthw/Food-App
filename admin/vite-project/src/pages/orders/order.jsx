import React from 'react'
import './order.css'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
function Order() {

  const [orderlist , setOdrlist] = useState([])
  const get_orders = async() =>{
    try{
      const resp = await axios.get('http://localhost:5000/api/odr/sendodr')
      if(resp.data.success){
        setOdrlist(resp.data.message)
      
      }
      else{
        console.log(resp.data.message)      
      }
    }catch(e){
      console.log(e)
    }
  }

  const confirm_odrs = async(id , email , item_list , total)=>{
    try{
      const item_names = item_list.map(item => item.name);
      
      const resp = await axios.post('http://localhost:5000/api/odr/cnfrmodr' , {id ,email , item_names , total})
      if(resp.data.success){
        console.log('Order Confirmed!!')
        const newArr = orderlist.filter(item => item._id !== id); // Remove object with id 2
        setOdrlist(newArr)
      }
      else{
        console.log(resp.data.message)
      }
    }catch(e){
      console.log(e)
    }
    
  }

  useEffect(()=>{
    get_orders()
  }, [])


  return (
    <div className='order-list'>
      {orderlist.map((item, index)=>{
            const timestamp = item.date; // Assuming item.date is a timestamp
            const formattedDate = new Date(timestamp).toLocaleString(); // Convert to local date format
        return <>
        <div key={index}>
          <h1>Total : {item.amount}BDT</h1>
          <h1>{item.address.email}</h1>
          {item.items.map((item)=>{
            return <h1>item : {item.name}</h1>
          })}
          <p>Ordered On : {formattedDate}</p>
          <button onClick={()=>{
            
            confirm_odrs(item._id , item.address.email , item.items ,item.amount)

          }} >Confirm this</button>
        </div>        
        <br />
        <hr />
        </>
      })}   
    </div>
  )
}

export default Order