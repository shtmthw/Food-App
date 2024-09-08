import React, { useState ,useContext } from 'react'
import { assets } from '../assets'
import { StoreContext } from '../../context/store-cntxt'
import './food_add_img.css'

function Food_add_img({id}) {
    const {food_list ,add_item_incart,remove_cart_itm,setCIM,cart_itm_amnt} = useContext(StoreContext)
    
    return (

        <div className='add-btn'>
            {!cart_itm_amnt[id] ? <img src={assets.add_ico} className='add-btn' onClick={() => { add_item_incart(id) }} alt="" /> : <>
            
            <button className='adde-btn' onClick={() => {add_item_incart(id)}}>+</button>
            <p className='item-amnt'>{cart_itm_amnt[id]}</p>
            <button className='rmmv-btn' onClick={()=> {remove_cart_itm(id)}}>-</button>
            </>}
        </div>
    )
}

export default Food_add_img