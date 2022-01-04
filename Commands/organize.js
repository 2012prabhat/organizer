const fs = require("fs");
const path = require("path");
let types = {
    Videos: [".mp4", ".mkv",".mpeg",".avi",".3gp"],
    Archives: ['.zip', '.7z', '.rar', '.tar', '.gz', '.ar', '.iso', ".xz"],
    Documents: ['.docx', '.doc', '.pdf', '.xlsx', '.xls', '.odt', '.ods', '.odp', '.odg', '.odf', '.txt', '.ps', '.tex','.ppt'],
    Applications: ['.exe', '.dmg', '.pkg', ".deb",".apk",".msi"],
    Audio:[".mp3",".wav",".amr",".m4a",".wma",".aac",".flac"],
    Images:[".png",".jpeg",".jpg",".gif",".bmp"],
    Codes:[".json",".html",".css",".py",".java",".js",".cpp",".c",".php"],
}

function organizeFun(dirPath,command){
    let operation = command.slice(8);
    console.log("organize initiated with path "+dirPath);
    let organizePath = path.join(dirPath,"Organized_Files");
    if(fs.existsSync(organizePath)==false) fs.mkdirSync(organizePath);
    let allFiles = fs.readdirSync(dirPath);
    for(let i=0;i<allFiles.length;i++){
        allFilesPath = path.join(dirPath,allFiles[i]);
        isFile = fs.lstatSync(allFilesPath).isFile();
        if(isFile){
            let typeOfFile = fileType(allFilesPath);
            console.log(allFilesPath +" belongs to ➡  "+typeOfFile);
            let fileName = path.basename(allFilesPath);
            let typeDir = path.join(organizePath,typeOfFile);
            if(fs.existsSync(typeDir)==false) fs.mkdirSync(typeDir);
            fs.copyFileSync(allFilesPath,path.join(typeDir,fileName));
            console.log(path.basename(allFilesPath)+" "+operation+" to "+typeDir);
            if(operation=="Move") fs.unlinkSync(allFilesPath);
            console.log();
        }
    }
    console.log("ALL DONE".green);
}

function fileType(filePath){
    let extension = path.extname(filePath);
    for(let fileType in types){
        let fileTypeArray = types[fileType];
        for(let i=0;i<fileTypeArray.length;i++){
            if(extension==fileTypeArray[i]){
                return fileType;
            }
        }
    }
    return "Others";
}

module.exports = {
    organizeFxn : organizeFun,
}