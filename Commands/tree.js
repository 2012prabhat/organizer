const fs = require("fs");
const path = require("path");
const colors = require("colors");
function treeFun(dirPath){
    if(fs.existsSync(dirPath)==false){
        console.log("Please Enter Correct Path");
        return;
    }
    console.log("Tree Command Intiated with path "+dirPath);
    treeExecute(dirPath,"");
}
function treeExecute(dirPath,space){
   let isFile = fs.lstatSync(dirPath).isFile();
   if(isFile){
       let fileName = path.basename(dirPath);
       console.log(space+"├──"+fileName.brightGreen);
   }else{
       let dirName = path.basename(dirPath);
       console.log((space+"└──"+dirName).cyan);
       let childs = fs.readdirSync(dirPath);
       for(let i=0;i<childs.length;i++){
           let childPath = path.join(dirPath,childs[i]);
           treeExecute(childPath,space+"\t");
       }
   }
}
module.exports = { 
    treeFxn : treeFun,
}
