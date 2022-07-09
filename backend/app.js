const express = require('express');
const cors = require('cors');

const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleware = require('../backend/middleware/error');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

dotenv.config({ path: 'backend/config/config.env' });

const corsOptions = {
  origin: 'http://localhost:3000',
  withCredentials: true,
  //   Access-Control-Allow-Credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//routes import
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');
app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);

//Middleware for error
app.use(errorMiddleware);

module.exports = app;
