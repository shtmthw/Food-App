import React, { useContext, useState } from 'react'
import '../nav/navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/store-cntxt'
function Navbar({setLog}) {
  const [navelem , setNavelem] = useState('1st')
  const navigate = useNavigate()
  const { food_list,cart_itm_amnt, setShowsearch,showsearch, token , setToken} = useContext(StoreContext)
  return (
    <div className='Navbar'>
      <div className='pfp'>
      <Link to={'/'}><img src={assets.logo} alt="" width={120} className="logo" /></Link> 
      </div>
      <ul className='nav-men'>
        <p><Link to = '/' onClick={ ()=>setNavelem('1st')} className={navelem== '1st'? 'acitve' : ''}>Home</Link></p>
        {/* <li onClick={ ()=>setNavelem('2nd')} className={navelem== '2nd'? 'acitve' : ''}>Categories</li> */}
        <p><Link to = '/myorders' onClick={ ()=>setNavelem('2nd')} className={navelem== '2nd'? 'acitve' : ''}>Orders</Link></p>
     
      </ul>
      <div className="navbar-right">
        <img src={assets.src} className='src_logo' onClick={()=>{
          setShowsearch(true)
        }} width={30} height={27} alt="" />
        <div className="navbar-src-icn">
        <Link to={'/cart'}> <img src={assets.basket} width={27} alt="" /></Link>
          {food_list.map((item , index)=>{
            if(cart_itm_amnt[item._id] > 0){
              return <div className='dot'></div>
            }
            else{
              return <div></div>
            }
          })}
        </div>
        {!token ? <button onClick={() => setLog(true)} className='singing'>SingIn!</button> : <><div>
          <button onClick={()=>{
            localStorage.removeItem('token')
            setToken('')
            navigate('/')
          }} >LogOut</button>
          </div></>}
        
      </div>
    </div>
  )
}

export default Navbar