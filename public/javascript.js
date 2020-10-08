const clas=document.querySelector(".dropZone")
const fileInput=document.querySelector("#mainfile");
const button=document.querySelector(".browse");
const pro=document.querySelector(".progressbar");
const widthset=document.querySelector(".main_progress")
const progressbar=document.querySelector(".progress")
const perset=document.querySelector("#per")
const fileURL=document.querySelector("#URLori");
const copyURL=document.querySelector(".copyURL");
const copyTag=document.querySelector(".copytag");
// const localURL="http://localhost:3000/"
// const uploadURL=`${localURL}api/main`;
copyTag.addEventListener("click",()=>{
fileURL.select();
document.execCommand("copy");

})

clas.addEventListener("dragover",(e)=>{
    e.preventDefault()
     if(!clas.classList.contains("eventClass1"))
    clas.classList.add("eventClass1");
})

clas.addEventListener("dragleave",()=>{
   
    clas.classList.remove("eventClass1");
})

clas.addEventListener("drop",(e)=>{
   e.preventDefault()
   clas.classList.remove("eventClass1");
   const files=e.dataTransfer.files;
//    console.table(files);
   if(files.length)
//    console.log(files)
   fileInput.files=files;
    upload();
})
fileInput.addEventListener("change",()=>{
    upload()
})
button.addEventListener("click",()=>{
    fileInput.click();
})
const upload=()=>{
    // to display after upload
    pro.style.display="block";
    const filedata =fileInput.files[0];
    // console.log(filedata);
    const form=new FormData();
    form.append("data",filedata);
    // console.log(form.get('data'))
    const xhr=new XMLHttpRequest();
    //  xhr.getResponseHeader('Content-type','multipart/form-data');
    xhr.onload=()=>{
 if(xhr.readyState===XMLHttpRequest.DONE){
// console.log(xhr.readyState);
// console.log(JSON.parse(xhr.response))
link(JSON.parse(xhr.response));
    }
}
xhr.upload.onprogress=progress;
xhr.open("POST",'http://localhost:3000/api/main');
// xhr.setRequestHeader("data",filedata)
    xhr.send(form)
}
const progress=(e)=>{
    const per=Math.round((e.loaded/e.total)*100);
    // console.log(per);
    widthset.style.width=`${per}%`;
    perset.innerText=per;
    progressbar.style.transform=`scaleX(${per/100})`;
    if(per==100){
        document.getElementById("title").innerHTML="Uploaded Successfully!"
    }
}
const link=({file})=>{
    console.log(file);
    // pro.style.display="none";
    copyURL.style.display="block"
    fileURL.value=file;
}
