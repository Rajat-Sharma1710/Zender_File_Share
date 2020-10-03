var mongoose=require("mongoose");
require('dotenv').config();
mongoose.connect(process.env.db_URL,{useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true,});
var conn=mongoose.connection;

var passSchema=mongoose.Schema({
   filename :{
    type:String,
    required:true
   },
   path:{
    type:String,
    required:true
   },
   size:{
    type:Number,
    required:true
   },
   uid:{
    type:String,
    required:true
   },
   sender:{
    type:String,
    required:false
   },
   reciever:{
    type:String,
    required:false
   }
},{ timestamps:true})

var filedbModel=mongoose.model("fileApp",passSchema)
module.exports=filedbModel;