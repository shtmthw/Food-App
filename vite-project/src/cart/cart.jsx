import React, { useContext } from 'react'
import './cart.css'
import { StoreContext } from '../context/store-cntxt'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Cart() {
  const { food_list, add_item_incart, remove_cart_itm, setCIM, cart_itm_amnt } = useContext(StoreContext)
  let tot_tk = 0;
  function check_price(price) {
    if (price.toFixed(2).toString().length <= 5) {
      let new_price = "0" + price.toFixed(2).toString()
      return new_price
    }
    else {
      let new_price = price.toFixed(2).toString()
      return new_price
    }

  }


  const navigate = useNavigate()


  return (
    <div className='cart'>
      <div className="cart-tms">
        <div className="crt-itm-title">

        </div>

        <div className="crt-itm-fltr">
          <table>
            <thead>
              <tr>
                <th className='T'>Title</th>
                <th className='Pr'>Price</th>
                <th className='Q'>Quantity</th>
                <th className='T2'>Total</th>
                <th className='R'>Remove</th>
                <th className='A'>Add</th>
              </tr>
            </thead>
            <tbody>

              {food_list.map((item, index) => {
                if (cart_itm_amnt[item._id] > 0) {
                  let tk = cart_itm_amnt[item._id] * item.price;
                  tot_tk = tot_tk + tk
                  return <tr>
                    <td>{item.name}</td>
                    <td>{check_price(item.price)}</td>
                    <td>{cart_itm_amnt[item._id]}</td>
                    <td>{check_price(tk)}</td>
                                      <td className='rmbtn' onClick={async () => {
                      remove_cart_itm(item._id)
                      tk = cart_itm_amnt[item._id] * item.price;
                      tot_tk = tot_tk + tk
                    }}>Remove</td>
                    <td className='adbtn' onClick={async () => {
                      add_item_incart(item._id)
                      tk = cart_itm_amnt[item._id] * item.price;
                      tot_tk = tot_tk + tk
                    }}>Add</td>
                  </tr>

                }
              })}
            </tbody>

          </table>


        </div>

        <div>{tot_tk == 0 ? <><p className='Empt-crt'>Cart Is Empty</p></> : <><p className='Sub_tot'>Sub Total : {tot_tk.toFixed(2)}</p>
          <button className="sub-button" role="button" onClick={() => {
            navigate('/checkout')
          }}>Procced to checkout!</button>
        </>}</div>
      </div>
    </div>
  )
}



export default Cart