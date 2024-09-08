import React from 'react'
import './expmen.css'
import { cum_menu } from '../assets/assets'
function Expmen({ cat, setCat }) {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1 className='ex-men-h1'>Explore Our Menu!!</h1>
            <p className='ex-men-p'>Chose Whatever Your Mouth Prefers..</p>
            <div className="exp-menu-lst">
                {cum_menu.map((item, index) => {
                    return (
                        <div key={index} className="exp-lst-itm">
                            <img onClick={() => {
                                if (!cat.includes (item.item_name)) {
                                    setCat(item.item_name)
                                }
                                else{
                                    setCat('All')
                                }
                            }} className={cat === item.item_name ? 'active' : ''} src={item.item_img} alt="" width={130} />
                            <p>{item.item_name}</p>
                        </div>
                    )

                })}
            </div>
            <hr />
        </div>
    )
}

export default Expmen