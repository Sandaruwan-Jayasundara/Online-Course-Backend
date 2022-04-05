const mongoose=require("mongoose");

const MONGODB_URL='mongodb+srv://course:course@cluster0.wj996.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const connectDB =async () =>{
    await mongoose.connect(MONGODB_URL,{
        useCreateIndex:true,
        useUnifiedTopology:true,
        useNewUrlParser:true,
        useFindAndModify:false
    });
    console.log('================ Database Synchronized ===================');
}
module.exports=connectDB;

