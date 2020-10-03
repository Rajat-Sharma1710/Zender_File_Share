const router=require('express').Router()
const dbfile=require('../modules/dbConn');
router.get("/:uid",async (req,res)=>{

try{
    const uidfile= await dbfile.findOne({uid:req.params.uid});
    if(!uidfile)
    res.render('downloadPage',{error:"Link expires"})

    res.render('downloadPage',{
        uid:uidfile.uid,
        fileName:uidfile.filename,
        fileSize:uidfile.size,
        downloadLink:`${process.env.URL}/api/file_download/${uidfile.uid}`,
    })

}

catch(err){
    return res.render('downloadPage',{error:"Something went wrong!"})
}

})


module.exports=router;