import React, { useState } from 'react'
import './add.css'
import { assets } from '../../../../../vite-project/src/assets/assets'
import axios from 'axios'
function Add() {
  const backend = 'http://localhost:5000/'
  const [image , setImage] = useState(null)
  const [data, setData] = useState({
    name : '',
    desc : '',
    price : '',
    category : ''
  })
  const onChangehandler = (event) =>{
    const name = event.target.name
    const value = event.target.value
    setData( data => ({...data , [name]:value}) )
  }




  const form_handler = async(event)=>{
        event.preventDefault()
        const form_instance = new FormData()
        form_instance.append('name' , data.name)
        form_instance.append('desc' , data.desc)
        form_instance.append('price' , Number(data.price))
        form_instance.append('image' , image)
        form_instance.append('category' , data.category)
        const resp = await axios.post(`http://localhost:5000/api/food/add` , form_instance)
        if(resp.data.success){
            setData({
              name : '',
              desc : '',
              price : '',
              category : ''
            })
            setImage(null)
        }
        else{

        }
  }


  return (
    <div className='main-add'>  
      <div className="add-from">
        <form className='m_form' onSubmit={form_handler}>
          <img src={image?URL.createObjectURL(image) : assets.logo} width={50} alt="" />
          <input type='file' onChange={(e)=>{
             setImage(e.target.files[0])
          }} className='img' name='image' required/>
          <input type="text" onChange={onChangehandler} className='name' name='name' required placeholder='name' />
          <textarea name="desc"onChange={onChangehandler} className='desc' required placeholder='desc' rows={10} id=""></textarea>
          <input type='number' className='price' onChange={onChangehandler}required name='price'  placeholder='price' />
          <select name="category" onChange={onChangehandler} id="">
            <option value="Meats">Meats</option>
            <option value="Mixed">Mixed</option>
            <option value="Vegies">Vegies</option>
          </select>
          <button className='sub-btn' type='submit'>Push</button>
        </form>
      </div>
    </div>
  )
}

export default Add