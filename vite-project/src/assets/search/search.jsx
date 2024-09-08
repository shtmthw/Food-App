import React from 'react'
import { useContext , useState , useEffect } from 'react'
import { StoreContext } from '../../context/store-cntxt'
import { useNavigate } from 'react-router-dom'  
import './search.css'
function Search() {
    const {food_list , setSearch_result,showsearch , setShowsearch} = useContext(StoreContext)
    const [userSrc , setUsrsrc] = useState('')
    const navigate = useNavigate()
    const handleinput = (event)=>{
        setUsrsrc(event.target.value)
    }
    const filteredFood = food_list.filter((item) =>
        item.name.toLowerCase().includes(userSrc.toLowerCase())
      );
    const verify_src = async(food_id)=>{
      setSearch_result(food_id)
    }

    return (
    <>
        <div className="src-box">
            <input className='srch_input' type="text" value={userSrc} onChange={handleinput} placeholder='Search Your Mind!'/>    
            <button className='Colse-box' onClick={()=>{
                setShowsearch(false)
            }}>X</button>
        {filteredFood.length > 0 ? (
          filteredFood.map((food) => <div className='Results' onClick={async()=>{
            await verify_src(food._id)
            navigate('/search_result')
            setShowsearch(false)

          }} key={food._id}>{food.name}</div>)
        ) : (
          <p className='not_found_txt'>No results found</p>
        )}
       </div>

    </>
    
  )
}

export default Search