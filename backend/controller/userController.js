import user_model from "../modles/userModel.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import validator from "validator";

const create_token = (id) => {
    return JWT.sign({ id }, process.env.JWT_SECRET);
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_model.findOne({ email });
        
        if (!user) {
            return res.send({ success: false, message: 'User Not Found!' });
        }

        const chck_pass = await bcrypt.compare(password, user.password);

        if (!chck_pass) {
            return res.send({ success: false, message: 'Password didn\'t match' });
        }

        const token = create_token(user._id);
        return res.send({ success: true, message: "Logged in!" , token : token });

    } catch (e) {
        return res.send({ success: false, message: e.message });
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const check_user = await user_model.findOne({ email });

        if (check_user) {
            return res.send({ success: false, message: 'Email already exists' });
        }

        if (password.length < 6) {
            return res.send({ success: false, message: 'Password too short' });
        }

        if (!validator.isEmail(email)) {
            return res.send({ success: false, message: 'Not a valid email' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash_pass = await bcrypt.hash(password, salt);

        const user_data = new user_model({
            name,
            email,
            password: hash_pass
        });

        const save_user = await user_data.save();
        const token = create_token(save_user._id);

        return res.send({ success: true, message: 'Successfully registered!' , token : token });

    } catch (e) {
        return res.send({ success: false, message: e.message });
    }
};
