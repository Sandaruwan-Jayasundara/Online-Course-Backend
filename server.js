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

console.log("TEST PASS");

app.use(bodyParser.json());

// const UserManagement=require('./api/UserManagement/UserManagement.api');
// app.use('/user-management',UserManagement);

// const EmployeeManagement=require('./api/EmployeeManagement/EmployeeManagement');
// app.use('/employee-management',EmployeeManagement);


const Authentication=require('./api/Authentication/Auth.api');
app.use('/auth',Authentication);

const productAPI = require('./api/product.api');
app.use('/products', productAPI);

const cartAPI = require('./api/cart.api');
app.use('/carts', cartAPI);

const OrderAPI = require('./api/Order');
app.use('/orders', OrderAPI);


// const listAPI = require('./api/list.api');
// app.use('/lists', listAPI);
// const orderAPI = require('./api/order.api');
// app.use('/orders', orderAPI);


app.listen(PORT,() =>{
    console.log('Service is running');
});
