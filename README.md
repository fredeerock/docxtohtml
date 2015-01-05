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
