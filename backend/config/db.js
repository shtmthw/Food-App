import mongoose from 'mongoose'

export const connect_db = async()=> await mongoose.connect('mongodb://127.0.0.1:27017/Food-delevery').then(() => {
    console.log('db connected')
}).catch((e) => {
    console.log(e)
})