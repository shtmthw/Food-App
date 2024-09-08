import mongoose from "mongoose";

const  odr_shcema = new mongoose.Schema({
    userID:{
        type : String,
        required : true
    },
    items:{
        type : Array,
        required : true
    },
    amount:{
        type : Number,
        required : true
    },
    address : {
        type : Object,
        required : true
    },
    status : {
        type : String,
        default : 'Food Is Being Processed!'
    },
    date : {
        type : String,
        default : Date.now()
    },
    payment:{
        type : Boolean,
        default : false
    }
})

const order_model = mongoose.model.order || mongoose.model('order' , odr_shcema)
export default order_model