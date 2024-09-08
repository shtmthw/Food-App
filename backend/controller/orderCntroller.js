import order_model from "../modles/orderModle.js"
import user_model from "../modles/userModel.js"
import { Stripe } from 'stripe'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ServerSide_email,
    pass: process.env.ServerSide_email_App_Pass,
  },
});

const stripe = new Stripe(process.env.STRIPE_SEC_KEY);

export const Order_placement = async (req, res) => {
  const frontend_url = 'http://localhost:5173';

  try {
    const new_ord = new order_model({
      userID: req.body.userID,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await new_ord.save();
    await user_model.findByIdAndUpdate(req.body.userID, { cartObj: {} });

    const line_item = req.body.items.map((item) => ({
      price_data: {
        currency: 'BDT',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_item.push({
      price_data: {
        currency: 'BDT',
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_item,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${new_ord._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${new_ord._id}`,
    });

    res.json({ success: true, session_url: session.url });

  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};

export const verify_order = async (req, res) => {
  try {
    const { orderId, success } = req.body;
    if (success === 'true') {
      await order_model.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: 'Payment Successful' });
    } else {
      await order_model.findByIdAndDelete(orderId);
      res.json({ success: false, message: 'Payment Unsuccessful, Order Deleted' });
    }
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};

export const fetch_order = async (req, res) => {
  try {
    const orders_by_user = await order_model.find({ userID: req.body.userID });
    res.status(200).json({ success: true, message: orders_by_user });
  } catch (e) {
    console.error('Error fetching orders:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

export const send_orderlist = async (req, res) => {
  try {
    const odr_list = await order_model.find({});
    res.json({ success: true, message: odr_list });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};

export const confirm_order = async (req, res) => {
  try {
    const id = req.body.id;

    const mailOptions = {
      from: process.env.ServerSide_email,
      to: 'mathiwasbaroi@gmail.com', // Replace with actual user email
      subject: 'Order Confirmation',
      text: `Hi ${req.body.email},\nYour order of ${req.body.item_names.join(', ')} has been confirmed!`,
    };

    const send_mail = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', send_mail.response);

    // Update order status instead of deleting it
    const order_cnfrm_byID = await order_model.findById(id);
    if (order_cnfrm_byID) {
      order_cnfrm_byID.status = 'Order Confirmed!';
      await order_cnfrm_byID.save(); // Save the updated status
    } else {
      return res.json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: 'Order Confirmed' });

  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};
