import express, { Router } from 'express'
import { register , login } from '../controller/userController.js'

const user_route = express.Router()


user_route.post('/registerUser' , register)

user_route.post('/loginUser' , login)


export default user_route 