import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null)


const StoreContProv = (props) => {
    const [food_list , setFList] = useState([])
    const [token , setToken] = useState('')
    const [cart_itm_amnt, setCIM] = useState({})
    const [showsearch , setShowsearch] = useState(false)
    const [search_result , setSearch_result] = useState('')

    const add_item_incart = async(itemID) => {
    
        if(token){
            await axios.post('http://localhost:5000/api/cart/addcartitm' , {itemID} , {headers : {token}})        
        }
        if(!cart_itm_amnt[itemID]){
            setCIM((prev)=> ({...prev , [itemID] : 1}))
        }
        else{
            setCIM((prev)=> ({...prev , [itemID] : prev[itemID] + 1}))
        }
    }

    const remove_cart_itm = async(itemID) =>{
            
        if(token){
            await axios.post('http://localhost:5000/api/cart/removecartitm' , {itemID} , {headers : {token}})
        }
        setCIM((prev => ({...prev , [itemID] : prev[itemID] - 1})))
    }

    const fetch_food_list = async ()=>{
        const f_data = await axios.get('http://localhost:5000/api/food/AllFoodList')
        setFList(f_data.data.message)

    }

    const get_cart = async(token)=>{
        const cart_data= await axios.post('http://localhost:5000/api/cart/getcart' ,{} , {headers : {token}})
        if(cart_data.data.success){
            setCIM(cart_data.data.message)
        }else{
            console.log(cart_data.data.message)
        }
    }
    useEffect(()=>{


        async function render_crucials(){
            await fetch_food_list()
            if(localStorage.getItem('token')){
                await setToken(localStorage.getItem('token'))
                await get_cart(localStorage.getItem('token'))
                console.log('all Running')
            }
        }


        render_crucials()


    } , [])

    const contextval = {
        food_list,
        add_item_incart,
        remove_cart_itm,
        setCIM,
        cart_itm_amnt,
        token,
        setToken,
        showsearch,
        setShowsearch,
        setSearch_result , 
        search_result
    }
    return (
        <StoreContext.Provider value={contextval}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContProv