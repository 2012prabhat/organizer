let fs = require("fs");
let path = require("path");
let indent = " ";
function treeFn(src) {
    console.log("tree command executed with path : " + src);
    if(src==undefined){
        console.log("Please enter the path");
        return;
    }else{
        let isExist = fs.existsSync(src);
        if(isExist){
             treeHelper(src,"");
        }else{
            console.log("This is not the correct path");
            return;
        }
    }
    
}

function treeHelper(src){
    let isFile = fs.lstatSync(src).isFile();
    if(isFile==true){
        let fileName = path.basename(src);
        console.log(indent+ "  |-- "+fileName);
    }else{
        let dirName = path.basename(src);
        console.log(indent + "|-- "+dirName);
        let childrens = fs.readdirSync(src);
        for(let i=0;i<childrens.length;i++){
            let childPath = path.join(src,childrens[i]);
            treeHelper(childPath,indent);
        }
    }
}
 
module.exports = {
    treefxn: treeFn
}