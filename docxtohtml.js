/*
#About
This script is meant to take a .docx downloaded from google docs and convert it to a nicely formatted .html file. It is assumed the google docs file is made with almost exclusively with the tags `<ul>` and `<li>`.

# Dependencies
- homebrew (for installing pandoc and node)
- pandoc
- node

# Installation
Using [Homebrew] (http://brew.sh/) you can instal node and pandoc using the following.    

**1. Homebrew**    

`ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`    
**2. Pandoc**    
`brew install pandoc`    
**3. Node**    
`brew install node`

# Usage
    node docxtohtml.js <filename.docx>

# Notes
This is basically a mashup of the following.
- http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
- http://javascript.cs.lmu.edu/notes/commandlinejs/
*/

var fs = require('fs');

if (process.argv.length !== 3) {
    console.error('Exactly one argument required');
    process.exit(1);
}

var input = process.argv[2];
var execinput = input.replace(/ /g, '\\ ').replace(/'/g,'\\\'');
var output = input.replace('.docx', '.html');

// Convert the file
var exec = require('child_process').exec, child;

child = exec('pandoc ' + execinput + ' --ascii',
function (error, stdout, stderr) {
    //console.log('stdout: ' + stdout);
    if(stderr != '') {console.log('stderr: ' + stderr);}

    // console.log(execinput);

    var fuddified = stdout.replace(/(\s+)(?=<)/g, '').replace(/<blockquote>/g, '').replace(/<\/blockquote>/g, '').replace(/<li><p>/g, '<li>').replace(/<\/p><\/li>/g, '<\/li>').replace(/<\/p><ul>/g, '<ul>')
    fs.writeFile(output, fuddified, function (err) {
        if (err) throw err;
    });

    if (error !== null) {
        console.log('exec error: ' + error);
    }
});
