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

//NOTE - create readline interface for the CLI
const rl = readline.createInterface({
    input: process.stdin, // set standard input (keyboard) as input source
    output: process.stdout // set standard output (keyboard) as out target
})

//TODO - function to display the main menu options
function showMenu() {
    console.log('\n To-Do List App ===') // print app header
    console.log('1. Show Tasks')         // Option 1 : show tasks
    console.log('2. Add Task')           // option 2 : add a new task
    console.log('3. Mark Task as done')  // option 3 : mark a task as complete
    console.log('4. Delete a task')      // option 4 : remove a task from the list
    console.log('5. Exit')               // option 5 : Exit the program
    rl.question('\n Choose an Option (1-5: ', handleMenu) //prompt user for menu choice
}

//NOTE - function to save tasks array to the tasks.json file
function saveTasks(){
    fs.writeFileSync(FILE, JSON.stringify(todos, null, 2)) // write the todos array as pretty JSON file
}

//TODO - function to handle the menu option entered by the user
function handleMenu(choice) {
    switch(choice.trim()){ // use the trim input for comparison
        case '1':
            listTasks(); // if '1', show all tasks
            break

        case '2':
            addTask() //if '2': add new tasks
            break  
        
        case '3':
            promptMarkTaskAsDone() // if '3' : mark a task as completed
            break 

        case '4':   // if '4' : delete a task
            promptDeleteTask()
            break

        case '5':
            console.log('Goodbye!') // if '5' print good bye and close the app
            rl.close // close readline interface
            break
        default:
            console.log('Invalid choice. Try Again.') // if not 1-5, show error message
            showMenu()                                // show menu again
            break
    }
} 

