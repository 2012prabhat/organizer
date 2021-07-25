
let fs = require("fs");
let path = require("path");
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

let destPath;
function organizeFn(src) {
    console.log("organize command executed with path: " + src);
    // code 
    if(src==undefined){
        console.log("Please enter the path of unorganized folder");
        return;
    }else{
        let isExist = fs.existsSync(src);
        if(isExist){
           destPath=path.join(src,"organized folder");
            fs.mkdirSync(destPath);
        }
        else{
            console.log("Please enter the correct path");
        }
   }
   organizeHelper(src,destPath);
}
function organizeHelper(source,destination){
   let childNames =  fs.readdirSync(source);
   for(let i=0;i<childNames.length;i++){
       let childAddress = path.join(source,childNames[i]);
       let isFile = fs.lstatSync(childAddress).isFile();
       if(isFile){
            let category = getCategory(childNames[i]);
            console.log(childNames[i],"belongs to--> ",category);
            sendFiles(childAddress,destination,category);

       }
   }


    
}

function sendFiles(srcFilePath,destination,category){
    let categoryPath = path.join(destination,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath,destFilePath);
    console.log(fileName,"copied to ",category);

      
}
function getCategory(name){
    let ext =path.extname(name);
    ext = ext.slice(1);
    for(let type in types){
        let cTypeArray = types[type];
        for(let i=0;i<cTypeArray.length;i++){
            if(ext==cTypeArray[i]){
                return type;
            }
        }
    }
    return "others";
}
 
module.exports = {
    organizefxn: organizeFn
}