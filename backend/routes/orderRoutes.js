import order_model from "../modles/orderModle.js";
import express from 'express'
import { tkenDecryptionMW } from "../middlewares/tokenVerificationMW.js";
import { fetch_order, Order_placement } from "../controller/orderCntroller.js";
import { verify_order } from "../controller/orderCntroller.js";
import { send_orderlist } from "../controller/orderCntroller.js";
import { confirm_order } from "../controller/orderCntroller.js";
const order_route = express.Router()


order_route.post('/placeOrder' , tkenDecryptionMW , Order_placement  )
order_route.post('/verify' ,  verify_order)
order_route.post('/getodr' ,  tkenDecryptionMW , fetch_order)
order_route.get('/sendodr' ,  send_orderlist)
order_route.post('/cnfrmodr' ,  confirm_order)



export default order_route