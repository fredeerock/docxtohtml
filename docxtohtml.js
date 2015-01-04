// This script is meant to take a .docx downloaded from google docs and convert it to a nicely formatted .html file. It is assumed the google docs file is made with almost exclusively with the tags <ul> and <li>.

// # Dependencies
// pandoc
// node

// # Usage
// node replace.js <filename.docx>  

var fs = require('fs');

if (process.argv.length !== 3) {
    console.error('Exactly one argument required');
    process.exit(1);
}

var input = process.argv[2];
var output = input + '.html';

// Convert the file
var exec = require('child_process').exec, child;

child = exec('pandoc ' + input + ' --ascii',
function (error, stdout, stderr) {
	//console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);

    var fuddified = stdout.replace(/(\s+)(?=<)/g, '').replace(/<blockquote>/g, '').replace(/<\/blockquote>/g, '').replace(/<li><p>/g, '<li>').replace(/<\/p><\/li>/g, '<\/li>').replace(/<\/p><ul>/g, '<ul>')
	fs.writeFile(output, fuddified, function (err) {
    	if (err) throw err;
	});

    if (error !== null) {
    	console.log('exec error: ' + error);
    }
});