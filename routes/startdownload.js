const router=require('express').Router()
const dbfile=require('../modules/dbConn');
router.get("/:uid",async (req,res)=>{

    const file= await dbfile.findOne({uid:req.params.uid});
    if(!file)
    res.render('downloadPage',{error:"Link expires"})

    const filepath=`${__dirname}/../${file.path}`;
    res.download(filepath);

})


module.exports=router;