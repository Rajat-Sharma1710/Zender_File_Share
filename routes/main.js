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
    let upload=multer({
    storage:storage,
    // max size is 100mb in bytes
    limits:{fileSize:1000000 * 100}
    }).single('data');

    router.get('/',(req,res)=>{
        
        res.render('front');
        })

router.post('/',(req,res)=>{

upload(req,res,async (err)=>{
    
  try{
        const x=new dbfile({
            filename:req.file.filename,
            path: req.file.path,
            size: req.file.size,
            uid: uuidv4()
        })
        const dd = await x.save()
    
     res.json({file:`${process.env.URL}/file/${dd.uid}`});
    }
    catch(err){
        
            return res.status(500).send({error:err.message})
         }
})
})


module.exports=router;