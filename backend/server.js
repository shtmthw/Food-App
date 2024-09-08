import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connect_db } from './config/db.js';
import food_route from './routes/Foodoutes.js';
import user_route from './routes/userRotues.js';
import 'dotenv/config.js';
import cart_route from './routes/cartRoutes.js';
import order_route from './routes/orderRoutes.js';
const app = express();

// Custom implementation of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:5173', // Allow your frontend's origin
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization , token'
}));
app.use(express.json());  // Corrected spelling

connect_db();
app.use('/api/cart', cart_route);
app.use('/api/user', user_route);
app.use('/api/food', food_route);
app.use('/api/odr', order_route);

app.use('/images', express.static(path.join(__dirname, 'uploads')));  // Serving images

app.get('/', (req, res) => {
    res.send('Server is on');
})


app.listen(5000, () => {
    console.log('server is live');
});
