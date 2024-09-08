import mongoose from "mongoose";

const user_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    cartObj: {
        type: Object,
        default: {}
    }
}, { minimize: false });

// Corrected model creation
const user_model = mongoose.models.User || mongoose.model('User', user_schema);

export default user_model;
