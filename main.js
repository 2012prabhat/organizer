const colors = require("colors");
const fs = require("fs");
const help = require("./Commands/help.js");
const tree = require("./Commands/tree.js");
const organize = require("./Commands/organize.js");
// const chalk = require("chalk");
const input = process.argv.slice(2);
const command = input[0];
let  dirPath = input[1];
if(dirPath==undefined) dirPath = __dirname;

if(fs.existsSync(dirPath)==false || fs.lstatSync(dirPath).isFile()){
    console.log("You have Entered the Wrong Path Please enter your Path again");
    return;
}
if(command==undefined){
    console.log(`
Welcome To the File Organizer`.bold);
console.log("Type "+"node main.js help".red+" to show all the commands with their functions");
}

switch(command){
    case "help":
        help.helpFxn();
        break;
    case "tree":
        tree.treeFxn(dirPath);
        break;
    case "organizeCopy":
        organize.organizeFxn(dirPath,command);
        break;
    case "organizeMove":
        organize.organizeFxn(dirPath,command);
    break;
    default:
        console.log("Please enter the right command");
}
