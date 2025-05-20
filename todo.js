//NOTE - import the readline module for handling commandline input/output
const readline = require('readline')

//import fs (file system) module for reading/writing files
const fs = require('fs')

//NOTE - define the file where tasks will be saved

const FILE = 'tasks.json'

//initalize an empty array to store tasks
let todos = []

//TODO - check if the tasks.json file exists
if(fs.existsSync(FILE)){
    try {
        // IF file esixts, read it's contents (sync)
        const data = fs.readFileSync(FILE, utf8)
        // parse JSON string into the todos array
        todos = JSON.parse(data)
    } catch (e) {
        // if there is any error. start with an empty array
        todos = []
    }
}