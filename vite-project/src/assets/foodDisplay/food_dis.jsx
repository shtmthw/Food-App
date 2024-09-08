import React, { useState,useContext, useEffect } from 'react'
import './food_dis.css'
import { StoreContext } from '../../context/store-cntxt'
import { assets } from '../assets'
import Food_add_img from './food_add_img'
function Food_dis({ cat,}) {
  const {food_list} = useContext(StoreContext)

  return (
    <div className='food_dis'>
      <h2>Top Cum Dishes Near You</h2>
      <div className="food-dis-lst">
        {food_list.map((item, index) => {
          
          if(cat === 'All' || cat === item.category){
          return <div key={index} className="food_item">
            <div className="f-img">
              <img className='food-img' src={'http://localhost:5000/images/' + item.image}  alt="" />
              <Food_add_img id={item._id}></Food_add_img>
            </div>
            <div className="food_info">
              <div className='food_name'><h2>{item.name}</h2></div>
              <div className='food_desc'> <p> {item.desc} </p> </div>
              <div className='food_name'><p>${item.price}</p></div>
              
            </div>
          </div>
          }
        })}
      </div>
    </div>
  )
}

export default Food_dis