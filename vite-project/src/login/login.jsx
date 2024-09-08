import React, { useContext, useState } from 'react'
import './login.css'
import { useEffect } from 'react'
import { StoreContext } from '../context/store-cntxt'
import axios from 'axios'
function Login({setLog}) {

    const {token , setToken} = useContext(StoreContext)
    const[currStat , setCurrStat] = useState('SingUp')
    const [data , setData] = useState({
        name : '',
        email : '',
        password : ''
    })

    const ONChandler = (event) =>{
        const name = event.target.name
        const value = event.target.value
        setData(prev => ({...prev , [name] : value}))
    }

    const handle_register = async() =>{
        const post_data = await axios.post('http://localhost:5000/api/user/registerUser' , data)
        if(post_data.data.success){
            window.alert(post_data.data.message)
            setData({
                name : '',
                email : '',
                password : ''
            })
            setToken(post_data.data.token)
            localStorage.setItem('token' , post_data.data.token)
            setLog(false)

        }
        else{
            window.alert(post_data.data.message)
            setData({
                name : '',
                email : '',
                password : ''
            })

        }

    }
        
    const handle_login = async()=>{
        const check_data = await axios.post('http://localhost:5000/api/user/loginUser' , data)
        if(check_data.data.success){
            window.alert(check_data.data.message)

            setData({
                name : '',
                email : '',
                password : ''
            })
            setToken(check_data.data.token)
            localStorage.setItem('token' , check_data.data.token)
            setLog(false)

        }
        else{
            window.alert(check_data.data.message)
            setData({
                name : '',
                email : '',
                password : ''
            })

        }
    }
    const check_user_state = (event)=>{
        if(currStat === 'Login'){
            event.preventDefault()
            console.log('Login state')
            handle_login()
        }
        else{
            event.preventDefault()
            console.log('Singup state')
            handle_register()

        }
    }

    return (
       <div className="login-popup">
        
        
        
        <form className='log-popup-form' onSubmit={check_user_state} action="">
        
        
            <div className="lolg-title">
        
                <h2>{currStat}</h2>
        
                <button className='colse-popup' onClick={()=>{setLog(false)}}>x</button>
        
            </div>
        
            <div className="log-pop-inp">
        
                {currStat === 'Login' ? <></> : <input value={data.name} name='name' onChange={ONChandler} type='text' placeholder='Your Name?!'/>}
        
                <input name='email' onChange={ONChandler} value={data.email} type='email' placeholder='Your Email' />
        
                <input type='password' value={data.password} name='password' onChange={ONChandler} placeholder='Password' />
        
            </div>
        
            <button type='submit'>{currStat === 'Login'?'Login': 'Create Acount'}</button>
        
            <div className="log-pop-cond">
        
                <input type='checkbox' required />
        
                <p>By Countinuing you are agreeing with the terms of cumlland42069.</p>
        
            </div>
            
            {currStat==='Login'? <> <p>Create a new one?</p><span onClick={()=>{setCurrStat('Sing up')}}>CLick Here</span></>: <><p >Have one already?</p><span onClick={()=>{setCurrStat('Login')}}>CLick Here</span></>}
            
        </form>
      
      
       </div>             
  )
}

export default Login