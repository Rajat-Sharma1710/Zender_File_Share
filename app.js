const express=require('express')
// const cors=require('cors')
require('dotenv').config();
const main=require('./routes/main')
const download=require('./routes/download')
const startdowmload=require('./routes/startdownload')
const path=require('path')
const app=express()
const Port= process.env.PORT || 3000;

// const corsOptions = {
//     origin: process.env.ALLOWED_CLIENTS.split(',')
//     // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
//   }
//   app.use(cors(corsOptions))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/main',main)
app.use('/api/file_download',startdowmload)
app.use('/file',download)
app.listen(Port,()=>{
    console.log(`Listening on port ${Port}`);
})
