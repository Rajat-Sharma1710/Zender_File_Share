const router=require('express').Router()
const multer=require('multer')
const dbfile=require('../modules/dbConn')
require('dotenv').config();
const path=require('path')
const { v4: uuidv4 } =require('uuid');
var storage=multer.diskStorage({
    destination:"./uploads",
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
    })
    var upload=multer({
    storage:storage,
    // max size is 100mb in bytes
    limits:{fileSize:1000000 * 100}
    }).single('file');

router.post('/',(req,res)=>{

upload(req,res,async function(err){
    if(err){
        res.status(500)
    }
    var x=new dbfile({
        filename:req.file.filename,
        path: req.file.path,
        size: req.file.size,
        uid: uuidv4()
    })
    const save = await x.save()

return res.json({file:`${process.env.URL}/file/${save.uid}`});
})
})


module.exports=router;