import fs, { unlink } from 'fs'
import food_model from '../modles/food_model.js'
import mongoose from 'mongoose'



export const addfood = async(req ,res) =>{
    const image_name = `${req.file.filename}`

    const food = new food_model({
        name : req.body.name,
        price : req.body.price,
        desc : req.body.desc,
        image : image_name,
        category : req.body.category

    })
    try{
        await food.save()
        res.json({success:true , message:'Food Added'})
    }  
    catch(e){
        console.log(e)
        res.json({success:false , message:'Food Not Added'})

    }
}



export const get_all_food = async(req , res) =>{
    try{
        const list =  await food_model.find({})
        res.json({success : true , message : list})
    }
    catch(e){
        console.log(e)
        res.json({success : false , message : 'Eorror'})
    }

}



export const remove_food = async(req , res)=>{
    try{
        const selected_food = await food_model.findByIdAndDelete(req.body.id)
            console.log(`item is deleted`)
            res.json({success : true , message : selected_food})
            fs.unlink(`uploads/${selected_food.image}` , (e)=>{
                console.log(e)
            })
    }
    catch(e){
        console.log(e)
        res.json({success : false , message : 'Error'})

    }
}

