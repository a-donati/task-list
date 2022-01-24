// define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task')

// load all event listeners
loadEventListeners();

// load all event listeners func

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask)
    // clear task event
    clearBtn.addEventListener('click', clearTasks);
    // filter through tasks
    filter.addEventListener('keyup', filterTasks);

}

// get tasks from ls
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // create li and append when getting items from ls
    tasks.forEach(function (task) {
        // create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // create text node and append to li using value typed into taskInput
        li.appendChild(document.createTextNode(task));
        // create new link element
        const link = document.createElement('a');
        // materialize requires 'secondary-content to make button appear to the right
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = `<i class="far fa-trash-alt"></i>`;
        // append link to li
        li.appendChild(link);
        // append li to ul
        taskList.appendChild(li);

    })
}

// add task
function addTask(e) {
    e.preventDefault();
    if (taskInput.value === "") {
        alert('Add a task');
    }
    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and append to li using value typed into taskInput
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    // materialize requires 'secondary-content to make button appear to the right
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = `<i class="far fa-trash-alt"></i>`;
    // append link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);

    // store in ls
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = ""

}


function storeTaskInLocalStorage(task) {
    let tasks;
    // if there is nothing in ls, tasks is set to an empty array
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // otherwise, tasks are parsed from ls
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// remove task
function removeTask(e) {
    e.preventDefault();
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            // target parent element of delete icon, which is an a tag, then target the parent list item to remove
            e.target.parentElement.parentElement.remove();
            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// remove from ls
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        // if taskitem content === current task in the iteration
        if(taskItem.textContent === task) {
            // delete one from the index
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
    // remove all tasks
    // taskList.innerHTML = "";

    // faster method - while loop
    while (taskList.firstChild) {
        // while there is still something in the list 
        taskList.removeChild(taskList.firstChild);

    }
    clearTasksFromLocalStorage();
}


function clearTasksFromLocalStorage() {
    localStorage.clear;
}

// search for specific task(s)
function filterTasks(e) {
    // set search input to lowercase to simplify search
    const text = e.target.value.toLowerCase();
    console.log(text);
    // get all li with class collection-item
    document.querySelectorAll('.collection-item').forEach
        (function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
                // if item contains search parameters, it will appear in the task list while hiding those that do not match the search
            } else {
                task.style.display = 'none';
            }
        });
}