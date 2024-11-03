const express = require('express')
const dotenv = require("dotenv").config();
const cors = require('cors');

const session = require('express-session');
const MongoStore = require('connect-mongo');
const sessionConfig = require('./config/sessionConfig');


const app = express()
const port = process.env.PORT || 5001;

app.use(session(sessionConfig));

app.use(cors());

app.use(express.json());
//Rutes
const userRoute = require('./routes/userRoute');
const itemsRoute = require('./routes/itemsRoute');
const basketRoute = require('./routes/basketRoute');
const checkoutRoute = require('./routes/checkoutRoute');
const promotionsRoute = require('./routes/promotionsRoute');



app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/items', itemsRoute);
app.use('/api/basket', basketRoute);
app.use('/api/checkout', checkoutRoute);
app.use('/api/promotions', promotionsRoute);



//Connecting to the database
const connectDb = require('./config/dbConnection');
connectDb();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

