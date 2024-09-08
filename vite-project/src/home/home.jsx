import React, { useState } from 'react'
import './home.css'
import Header from '../header/header'
import Expmen from '../explore-men/exp-men'
import Food_dis from '../assets/foodDisplay/food_dis'
function Home() {
  const [cat , setCat] = useState('All')
  return (
    <div>
      <Header></Header>
      <Expmen cat = {cat} setCat = {setCat} />
      <Food_dis cat = {cat} ></Food_dis>
    </div>
  )
}

export default Home