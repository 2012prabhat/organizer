function helpFun(){
    console.log(`
List of all the commands:-

(1) node main.js help                   ->     It shows all the commands.

(2) node main.js tree "path"            ->     It gives the tree structure of the directory.

(3) node main.js organizeCopy "path"    ->     It will organize the files according to their extension, it makes copies of the file.

(4) node main.js organizeMove "path"    ->     It will organize the files according to their extension, it moves the original file.
    
**NOTE ➡  If you don't give the path after command then it will take the current directory path `.brightGreen);
console.log();
}

module.exports = {
    helpFxn : helpFun,
}