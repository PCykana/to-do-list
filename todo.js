//NOTE - import the readline module for handling commandline input/output
const readline = require('readline')

//import fs (file system) module for reading/writing files
const fs = require('fs')
const { markAsUntransferable } = require('worker_threads')
const { notEqual } = require('assert')

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

//NOTE - function to display all tasks in the list
function listTasks() {
    console.log('\nYour To-Do List:')   // print list header
    if(todos.length === 0){             // if there are no tasks
        console.log('No tasks found')   // inform user that list is empty
    }else {                             // if there are tasks
        todos.forEach((task, idx) => {  // for each in the array
            const status = task.done ? 'Completed': 'Not Completed' // Determine status Task
            console.log(`${idx + 1}. (${status}) ${task.text}`) // print task number, status, and description
        })
    }
    return showMenu() // show menu again after listing tasks
}

//NOTE - function to add a new task to the list
function addTask() {
    rl.question('\nEnter the task: ', (task) => { //Prompt user to enter the task description
        if(task.trim() === ''){ // if input is empty or only spaces
            console.log('Task cannot be empty.') //show error message
        }else {
            todos.push({text: task, done: false}) // add new task object
            saveTasks()                           // save updated tasks to file
            console.log('Task added!')            // confirm addition
        }
        showMenu()                                //show menu again
    })
}

//NOTE - function to prompt the user to select a task to mark as completed
function promptMarkTaskAsDone() {
    if(todos.length === 0){                        // if there are no tasks
        console.log('\nNo tasks to mark as done.') // show error message
        return showMenu()
    }
    console.log('\nSelect the number of the task to mark as completed.') //print prompt header
    todos.forEach((task, idx) =>{                                        // list all tasks with their header
        const status = task.done ? 'Completed' : 'Not Completed'         // status as text
        console.log(`${idx + 1}. (${status}) ${task.text}`)   //Print each task
    })
    rl.question('\nTask Number: ', (num) =>{ // prompt for task number
        markTaskAsDone(num)                  //pass input to markTaskasDone function
    })
}

//NOTE - function to mark the selected task as completed
function markTaskAsDone(num) {
    let idx = parseInt(num - 1) // convert user input to array index
    if (todos[idx]) {           // if a task exists at that index
        todos[idx].done = true  // mark the task as completed
        saveTasks()             // save changes to file
        console.log('Task marked as completed!') // confirm completion
    }else {
        console.log('Invalid task number.') // if input invalid show error
    }
    showMenu()                  // show menu again
}

//NOTE - function to prompt user to select a task to delete
function promptDeleteTask() {
    if(todos.length === 0){  // if there are no tasks
        console.log('\nNo tasks to delete.') //inform user 
        return showMenu() // show menu and exit function
    }
    console.log('\nSelect the number of the task to delete:') // primpt prompt header
    todos.forEach((task, idx) => {                            // list all tasks with their numbers
        const status = task.done ? 'Completed' : 'Not Completed'
        console.log(`${idx + 1}. (${status}) ${task.text}`) // print each task
    })
    rl.question('\nTask number: ', (num) => {  // prompt for task number
        deleteTask(num)                           // pass input to delete task function
    })
}

//NOTE - function to delete the selected task
function deleteTask(num){
    let idx = parseInt(num) - 1
    if (todos{idx}) {
        todos.splice(idx, 1)
        saveTasks()
        console.log('Task is deleted!')        
    }else {
        console.log('Invalid task number.')
    }
    showMenu()
}

// starttask to show the main men
showMenu()