const router=require('express').Router()
const dbfile=require('../modules/dbConn');
router.get("/:uid",async (req,res)=>{

    try{
        const file= await dbfile.findOne({uid:req.params.uid});
    if(!file)
    res.render('downloadPage',{error:"Link expires"})

    const response=await file.save();
    const filepath=`${__dirname}/../${file.path}`;
    res.download(filepath);
    }
    catch{
        res.render('downloadPage',{error:"Unexpected Error Occured!"})
    }
})


module.exports=router;