import { addfood  ,get_all_food ,remove_food} from "../controller/foodController.js";

import express from 'express'
import { now } from "mongoose";
import multer from "multer";

const food_route = express.Router()

const storage = multer.diskStorage({
    destination : 'uploads/',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
      }
})

const upload = multer({storage : storage})

food_route.post('/add' , upload.single('image') , addfood)//This add food is the funtion that in being imported
                                                            //from foodController.js

food_route.get('/AllFoodList' , get_all_food)


food_route.post('/RemoveFood' , remove_food)



export default food_route