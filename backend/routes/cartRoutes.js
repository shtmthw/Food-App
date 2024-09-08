import express from 'express'
import { getCart , add_cartitem , remove_cartitem } from '../controller/carrtController.js'
import { tkenDecryptionMW } from '../middlewares/tokenVerificationMW.js'
const cart_route = express.Router()


cart_route.post('/addcartitm' , tkenDecryptionMW , add_cartitem)
cart_route.post('/removecartitm' ,tkenDecryptionMW, remove_cartitem)
cart_route.post('/getcart' , tkenDecryptionMW, getCart)


export default cart_route
