const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB =require('./connection');
const app=express();
const cookieParser = require("cookie-parser");
dotenv.config()
var multer = require('multer');

const PORT = process.env.PORT || 8070;
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(cors(
    { 
       origin:["http://10.02.2:8081"],
       credentials: true,
    }
));

app.use(bodyParser.json());

const auth=require('./api/auth');
app.use('/auth',auth);

const course=require('./api/course');
app.use('/course',course);

const card=require('./api/course');
app.use('/card',card);

const category=require('./api/category');
app.use('/category',category);

const cart=require('./api/cart');
app.use('/cart',cart);

app.listen(PORT,() =>{
    console.log('Service is running');
});
