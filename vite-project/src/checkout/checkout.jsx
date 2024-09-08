import React, { useEffect } from 'react'
import { useContext , useState} from 'react'
import './checkout.css'
import { StoreContext } from '../context/store-cntxt'
import axios from 'axios'

function Checkout() {
    const { food_list, cart_itm_amnt , token} = useContext(StoreContext)
    const [userdata ,setUserdata] = useState({
        name : '',
        email : '',
        location : '',
        phone : ''
    })


    const OnChangeHandler = (event)=>{

        const name = event.target.name
        const value  = event.target.value

        setUserdata(prev => ({ ...prev, [name]: value }))
    }

    const place_order = async(event) =>{
        event.preventDefault()
        let list_of_item = []
        const order = food_list.map((item , index)=>{
            if(cart_itm_amnt[item._id] > 0){
                let list = item
                list['quantity'] = cart_itm_amnt[item._id]
                list_of_item.push(list)
                
            }
        })
        const order_userdata = {
            items : list_of_item,
            amount : tk, 
            address : userdata,
        }
        const send_order = await axios.post('http://localhost:5000/api/odr/placeOrder' , order_userdata , { headers : { token }} )
        if(send_order.data.success){
            const { session_url } = send_order.data
            window.location.replace(session_url)
        }
        else{
            console.log(send_order.data.message)
        }
    }

    let tk = 0

    return (
        <>
            <h1 className='head'>Put Your Info Below...</h1>
            <div className="all">
            <form action="" onSubmit={place_order}>
                <div className='Your_Details'>
                    {food_list.map((item, index) => {
                        if (cart_itm_amnt[item._id] > 0) {
                            tk = tk + cart_itm_amnt[item._id] * item.price;
                        }
                    })}
                    <input 
                        type="text" 
                        name="name" 
                        onChange={OnChangeHandler} 
                        value={userdata.name} 
                        className='Name' 
                        placeholder='Put your name please' 
                    />
                    <input 
                        type='email' 
                        name="email"
                        onChange={OnChangeHandler} 
                        value={userdata.email}  
                        className='Email' 
                        placeholder='Put your Email please' 
                    />
                    <input 
                        type='number' 
                        name="phone"
                        onChange={OnChangeHandler} 
                        value={userdata.phone}  
                        className='Phone' 
                        placeholder='Put your Phone Number please' 
                    />
                    <input 
                        type="text" 
                        name="location"
                        onChange={OnChangeHandler} 
                        value={userdata.location}  
                        className='full_location' 
                        placeholder='Put your exact location please' 
                    />
                    <h1 className='totof'>Total Of...</h1>
                    <h2>{tk.toFixed(2)}$</h2>
                    <button className='button-3' type='submit'>CheckOut!</button>
                </div>
                </form>

            </div>
        </>
    )
}

export default Checkout;
