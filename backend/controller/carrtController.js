import user_model from "../modles/userModel.js";


export const add_cartitem = async (req, res) => {
    try {
        const usser_data = await user_model.findOne({ _id: req.body.userID });
        const cart_data = usser_data.cartObj;

        if (!cart_data[req.body.itemID]) {
            cart_data[req.body.itemID] = 1;
        } else {
            cart_data[req.body.itemID] += 1;
        }

        await user_model.findByIdAndUpdate(req.body.userID, { cartObj: cart_data });
        res.json({ success: true, message: 'Added to the cart!' });
    } catch (e) {
        res.json({ success: false, message: e.message });
    }
}


export const remove_cartitem = async (req, res) => {
    const user_data = await user_model.findOne({_id : req.body.userID} )
    const cart_data = await user_data.cartObj

    if(cart_data[req.body.itemID] > 0){
        cart_data[req.body.itemID] -= 1
    }
    await user_model.findByIdAndUpdate(req.body.userID , {cartObj : cart_data } )
    res.json({success : true , message : 'Removed Cart Item!!'})

}
export const getCart = async (req, res) => {
    try{
        const user_data = await user_model.findOne({_id : req.body.userID} )
        const cart_data = await user_data.cartObj
        res.json({success : true , message : cart_data})
    }
    catch(e){
        res.json({success : false , message : e})

    }
}


