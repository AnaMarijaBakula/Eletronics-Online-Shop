const express = require('express')
const dotenv = require("dotenv").config();
const cors = require('cors');

const MongoStore = require('connect-mongo');

const app = express()
const port = process.env.PORT || 5001;


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

//Rutes
const adminRoute = require('./routes/adminRoute');
const itemsRoute = require('./routes/itemsRoute');
const promotionsRoute = require('./routes/promotionsRoute');
const orderRoute = require('./routes/orderRoute');

app.use('/api/admin', adminRoute);
app.use('/api/items', itemsRoute);
app.use('/api/promotions', promotionsRoute);
app.use('/api/order', orderRoute);


//Connecting to the database
const connectDb = require('./config/dbConnection');
connectDb();

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

