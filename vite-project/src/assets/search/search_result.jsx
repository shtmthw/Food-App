import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { StoreContext } from '../../context/store-cntxt'
import Food_add_img from '../foodDisplay/food_add_img'
import styles from './search_result.module.css'  // Import the module

function Search_result() {
    const { food_list, search_result } = useContext(StoreContext)

    useEffect(() => {
        console.log(search_result)
    }, [search_result])

    return (
        <div>
            {food_list.map((item, index) => {
                if (item._id === search_result) {
                    return (
                        <div key={index} className={styles.food_item}>
                        <div className={styles.f_img}>
                          <img className={styles.food_img} src={'http://localhost:5000/images/' + item.image} alt="" />
                        </div>
                        <div className={styles.food_info}>
                          <div className={styles.food_name}>
                            <h2>{item.name}</h2>
                          </div>
                          <div className={styles.food_desc}>
                            <p>{item.desc}</p>
                          </div>
                          <div className={styles.food_price}>
                            <p>${item.price}</p>
                          </div>
                        </div>
                        <Food_add_img className={styles.add_icon} id={item._id} /> {/* Add icon to the right */}
                      </div>
                      
                    )
                }
            })}
        </div>
    )
}

export default Search_result
