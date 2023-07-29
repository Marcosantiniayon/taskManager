const content = document.querySelector('.content');
const nav = document.querySelector('nav');
const modal = document.querySelector('.modal');
const tasksContainer = document.querySelector('.tasksContainer');
let form = document.querySelector('form');
const collapseBtn = document.getElementById('collapseBtn');
const allBtn = document.getElementById('allBtn');
const todayBtn = document.getElementById('todayBtn');
const thisWeekBtn = document.getElementById('thisWeekBtn');
const thisMonthBtn = document.getElementById('thisMonthBtn');
const createTaskBtn = document.getElementById('createTask');
const okTaskBtn = document.getElementById('okTaskBtn')
const cancelTaskBtn = document.getElementById('cancelTaskBtn');
let deleteBtnModal = document.getElementById('delete');
let titleInput= document.getElementById("title")
let categorySelect = document.getElementById("category");
let dueDateSelect = document.getElementById("dueDate");
let prioritySelect = document.getElementById("priority");
let descriptionInput = document.getElementById("description");

let span = document.getElementsByClassName("close")[0];

// Task Constructor
class Task {
    constructor(id, title, categoryObject, dueDate, priority, description) {
        this.id = id;
        this.title = title;
        this.category = categoryObject
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;
        this.complete = false; 
    }

    toggleComplete() {
        this.complete = !this.complete;
    }
}

// Adding New Task - Brings up new task modal
createTaskBtn.addEventListener('click', function() {
    // Set default inputs
    titleInput.value = "";
    categorySelect.value = "Inbox";
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    
    // Format the date as "mm-dd-yyyy"
    today = yyyy + '-' + mm + '-' + dd;
    dueDateSelect.value = today
    
    prioritySelect.value = "Low";
    descriptionInput.value = "";

    // Show the modal
    modal.style.display = "block";
});

    
// Creates / Edits task with input values
function addTask(title, category, categoryObject, dueDate, importance, description){
    // Create Task Object 
    let newTask = new Task(taskCounter, title, categoryObject, dueDate, importance, description);
    categoryObject.addTaskToCat(newTask);

    let taskId = newTask.id
    
    // Container div for the task and the line break
    const taskContainerDiv = document.createElement('div');
    taskContainerDiv.classList.add('taskContainerDiv');

    // Add Task Div
    function addTaskDiv(taskId, title, category, dueDate, taskCounter, prioritySelect){
        const taskBigDiv = document.createElement('div');
        taskBigDiv.classList.add('taskBigDiv');
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('taskDiv');
        taskDiv.id = taskId;
        taskDiv.dataset.taskId = taskId;

        console.log('new task,' + 'title: ' + title + ',id: ' + taskId + ', ' + taskDiv.id);

        taskDiv.addEventListener('click', function() {
            // Set the form inputs to the task's values
            titleInput.value = newTask.title;
            categorySelect.value = newTask.category.name;
            dueDateSelect.value = newTask.dueDate;
            prioritySelect.value = newTask.priority;
            descriptionInput.value = newTask.description;
        
            // Set the data attribute on the title input to the task's id so we know which task is being edited
            titleInput.dataset.editingTaskId = newTask.id;
        
            // Show the modal
            modal.style.display = "block";
        });

            const taskPrim = document.createElement('div');
            taskPrim.classList.add('taskPrim');
            taskDiv.appendChild(taskPrim);

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.addEventListener('click', function(event) {
                    event.stopPropagation();
                    if (this.checked) {
                    taskTitle.classList.add('complete');
                    taskCategory.classList.add('complete');
                    taskDueDate.classList.add('complete');
                    taskPriority.classList.add('complete');
                    } else {
                        taskTitle.classList.remove('complete');
                        taskCategory.classList.remove('complete');
                    taskDueDate.classList.remove('complete');
                    taskPriority.classList.remove('complete');
                    }
                });

                const taskTitle = document.createElement('div');
                taskTitle.classList.add('taskTitle');
                taskTitle.textContent = title;

                const taskCategory = document.createElement('div');
                taskCategory.classList.add('taskCategory');
                taskCategory.textContent = "(" + category + ")";

                taskPrim.appendChild(checkbox);
                taskPrim.appendChild(taskTitle);
                taskPrim.appendChild(taskCategory);

            const taskSec = document.createElement('div');
            taskSec.classList.add('taskSec');
            taskDiv.appendChild(taskSec);

                const taskDueDate = document.createElement('div');
                taskDueDate.classList.add('taskDueDate');
                taskDueDate.textContent = formatDateForInput(dueDate);

                const taskPriority = document.createElement('div');
                taskPriority.classList.add('taskDueDate');
                const taskPriorityImg = document.createElement('img');
                if(prioritySelect.value == "Highest"){taskPriorityImg.src = "./images/warning-333.png"}
                else if(prioritySelect.value == "High"){taskPriorityImg.src = "./images/warning-222.png"}
                else if(prioritySelect.value == "Medium"){taskPriorityImg.src = "./images/warning-111.png"}
                else {taskPriorityImg.src = "./images/warning_grey.png"}
                taskPriorityImg.classList.add('symbol');
                taskPriority.appendChild(taskPriorityImg);
                const deleteBtnBigDiv = document.createElement('img');
                deleteBtnBigDiv.id = taskId;
                deleteBtnBigDiv.src = "./images/delete.png"; // Change to your delete image's path
                deleteBtnBigDiv.classList.add('symbol');

                deleteBtnBigDiv.addEventListener('click', function(event) {
                    event.stopPropagation();
            
                    // Get taskId from the editingTaskId data attribute
                    let taskId = deleteBtnBigDiv.id;
            
                    if (!taskId) {
                        console.log('No task is currently being edited');
                        return;
                    }
            
                    deleteTask(taskId);
                });

                taskSec.appendChild(taskDueDate);
                taskSec.appendChild(taskPriority);
                taskBigDiv.appendChild(taskDiv);
                taskBigDiv.appendChild(deleteBtnBigDiv);

        const linebreak = document.createElement('hr');

        taskContainerDiv.appendChild(taskBigDiv);
        taskContainerDiv.appendChild(linebreak);
        tasksContainer.appendChild(taskContainerDiv);    
    } addTaskDiv(taskId, title, category, dueDate, taskCounter, prioritySelect);
    
}
function editTask(title, categoryObject, dueDate, importance, description){
    // Editing Task Object
    let taskId = titleInput.dataset.editingTaskId;
    let taskObject;
    for(let category of categories) {
        taskObject = category.tasks.find(task => task.id == taskId);
        if(taskObject) {
            break;
        }
    }
    if (taskObject === undefined) {
        console.error(`No task found with id ${taskId}`);
        return;
    }

    // Update the task object's values
    taskObject.title = title;
    taskObject.category = categoryObject;
    let formattedToday = yyyy + '-' + mm + '-' + dd;
        dueDateSelect.value = formattedToday;
    taskObject.dueDate = dueDate;
    taskObject.priority = importance;
    taskObject.description = description;

    // Log the taskId and taskDiv here
    console.log('editing task, title: ' + title + ' id: ' + taskId);
    let taskDiv = document.getElementById(taskId);

    // Update the taskDiv's textContent to reflect the new values
    taskDiv.querySelector('.taskTitle').textContent = title;
    taskDiv.querySelector('.taskCategory').textContent = `(${categoryObject.name})`;
    taskDiv.querySelector('.taskDueDate').textContent = dueDate;
    let taskPriorityImg = taskDiv.querySelector('.symbol');
        if(importance == "Highest"){taskPriorityImg.src = "./images/warning-333.png"}
        else if(importance == "High"){taskPriorityImg.src = "./images/warning-222.png"}
        else if(importance == "Medium"){taskPriorityImg.src = "./images/warning-111.png"}
        else {taskPriorityImg.src = "./images/warning_grey.png"}

    delete titleInput.dataset.editingTaskId;
    modal.style.display = "none";
}
    okTaskBtn.addEventListener('click', function(event) {
        if (document.querySelector('form').reportValidity()) {
            event.preventDefault();
            titleInput.classList.remove('error');
            
            // Assign property values based off inputs
            let title = document.getElementById("title").value;
            let category = document.getElementById("category").value;
            let categoryValue = document.getElementById("category").value;
            let categoryObject = categories.find(category => category.name === categoryValue);
            let dueDate = document.getElementById("dueDate").value;
            let importance = document.getElementById("priority").value;
            let description = document.getElementById("description").value;
        
            // Check if we're creating a new task or updating an existing one
            if (titleInput.dataset.editingTaskId) {
                editTask(title, categoryObject, dueDate, importance, description);
            } else {
                addTask(title, category, categoryObject, dueDate, importance, description);
            }
            
        
            modal.style.display = "none";
        
            } else { titleInput.classList.add('error'); }
        });
    // Cancels new inputs
    cancelTaskBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the form from submitting
        modal.style.display = "none";
    });

//Delete Tasks
    //Delete Button (inside Modal)
    deleteBtnModal.addEventListener('click', function(event) {
        event.stopPropagation();

        // Get taskId from the editingTaskId data attribute
        let taskId = titleInput.dataset.editingTaskId;

        if (!taskId) {
            console.log('No task is currently being edited');
            return;
        }

        deleteTask(taskId);
    });
    //Delete Button (Outside Modal) event listener is located inside addTaskDiv eventlistener 'DeleteBtnBigDiv'

    function deleteTask(taskId) {
        if (!confirm('Are you sure you want to delete this task?')) {
            // If the user cancels, just close the modal
            modal.style.display = "none";
            delete titleInput.dataset.editingTaskId;
            return;
        }

        let taskDiv = document.getElementById(taskId);
        if (!taskDiv) {
            console.error(`No task div found with id ${taskId}`);
            delete titleInput.dataset.editingTaskId;
            return;
        }

        // Find the task object that corresponds to this taskId
        let taskObject;
        let taskCategory;
        for (let category of categories) {
            taskObject = category.tasks.find((task) => task.id == taskId);
            if (taskObject) {
                taskCategory = category;
                break;
            }
        }


        // Remove the task from the category's tasks array
        taskCategory.removeTaskFromCat(taskId);

        // Update the taskCounter
        taskCounter--;

        // Update the taskCounter
        taskCounter = categories.reduce((count, category) => count + category.tasks.length, 0);

        // Get the parent node (taskContainerDiv) of the taskDiv
        let taskContainerDiv = taskDiv.parentNode;

        // Remove both the taskContainerDiv and the <hr> element (sibling of taskContainerDiv)
        if (taskContainerDiv && taskContainerDiv.nextElementSibling && taskContainerDiv.nextElementSibling.tagName === 'HR') {
            taskContainerDiv.nextElementSibling.remove(); // Remove <hr> element
        }
        taskContainerDiv.remove(); // Remove taskContainerDiv

        // Hide the modal
        modal.style.display = "none";

        // Clear the editingTaskId since we've just deleted the task
        delete titleInput.dataset.editingTaskId;
    }

// Remove the error class when the title input value changes
titleInput.addEventListener('input', function() {
    this.classList.remove('error');
});


// ---------------------------------------
// Category Constructor
class Category {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTaskToCat(task) {
        this.tasks.push(task);
        // Set the task's ID to match the correct counter value
        task.id = taskCounter;
        taskCounter++;
    }

    removeTaskFromCat(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
}
    // Function to initialize default categories
    function initializeCategories() {
        // Initialize default categories
        let defaultCategories = ["Inbox", "Chores", "Work", "Programming"];
        let categories = defaultCategories.map(categoryName => new Category(categoryName));
        let taskCounter = categories.reduce((count, category) => count + category.tasks.length, 0);

        return { categories, taskCounter };
    } let { categories, taskCounter } = initializeCategories();

// Event listeners for the buttons
allBtn.addEventListener('click', function () {
    // Implement your logic here for displaying all tasks
    // For example, you can show all tasks or remove any filtering criteria
    // For now, let's assume you want to show all tasks in the tasksContainer
    displayAllTasks();
  });
  
// Event listener for todayBtn
todayBtn.addEventListener('click', function () {
    // Get the current date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 to compare only the dates
  
    // Loop through all taskContainerDiv elements and check their tasks' due dates
    const allTaskContainerDivs = document.querySelectorAll('.taskContainerDiv');
    allTaskContainerDivs.forEach((taskContainerDiv) => {
      const taskDiv = taskContainerDiv.querySelector('.taskDiv'); // Get the taskDiv inside the current taskContainerDiv
      const taskId = taskDiv.dataset.taskId;
      const task = getTaskById(taskId); // Retrieve the task object by ID
  
      // Check if the task's due date is before or equal to today's date
      const taskDueDate = new Date(formatDateForInput(task.dueDate));
      taskDueDate.setHours(0, 0, 0, 0);
  
      if (taskDueDate <= today) {
        // Show the taskContainerDiv if its due date is before or equal to today
        taskContainerDiv.style.display = 'block';
        console.log("task: " + taskId + ", due date: " + taskDueDate);
      } else {
        // Hide the taskContainerDiv if its due date is after today
        taskContainerDiv.style.display = 'none';
        console.log("task: " + taskId + ", due date: " + taskDueDate);

      }
    });
  });
  
  

thisWeekBtn.addEventListener('click', function () {
displayTasksDueThisWeek();
});

thisMonthBtn.addEventListener('click', function () {
displayTasksDueThisMonth();
});

// Functions to implement the task filtering logic
function displayAllTasks() {
}

function displayTasksDueToday() {

}

function displayTasksDueThisWeek() {
}

function displayTasksDueThisMonth() {
}    
    
function getTaskById(taskId) {
    // Loop through each category
    for (const category of categories) {
      // Find the task in the category's tasks array with the matching ID
      const task = category.tasks.find((task) => task.id == taskId);
      if (task) {
        return task; // Return the task if found
      }
    }
  
    return null; // Return null if no task with the given ID is found
  }

// ---------------------------------------



// Nav Collapse & Expand
collapseBtn.addEventListener('click', function() {
    const navDisplayStyle = window.getComputedStyle(nav).display;
    const screenWidth = window.innerWidth;
    const isSmallScreen = screenWidth < 750;
  
    if (isSmallScreen) {
      if (navDisplayStyle === 'none') {
        nav.style.display = 'block';
        nav.style.zIndex = '2';
        content.style.gridColumn = '1 / 3';
        content.classList.add('overlay');
        collapseBtn.src = './images/collapse3.png';
      //   collapseBtn.style.marginLeft = '140px';
      } else {
        nav.style.display = 'none';
        nav.style.zIndex = '';
        content.style.gridColumn = '1 / -1';
        content.classList.remove('overlay');
        console.log('expand');
        collapseBtn.src = './images/expand3.png';
      //   collapseBtn.style.marginLeft = '12px';
      }
    } else {
      if (navDisplayStyle === 'none') {
        nav.style.display = 'block';
        nav.style.zIndex = '';
        content.style.gridColumn = '2/3';
        content.classList.remove('overlay');
        console.log('collapse');
        collapseBtn.src = './images/collapse3.png';
      //   collapseBtn.style.marginLeft = '240px';
      } else {
        nav.style.display = 'none';
        nav.style.zIndex = '';
        content.style.gridColumn = '1 / -1';
        content.classList.remove('overlay');
        console.log('expand');
        collapseBtn.src = './images/expand3.png';
      //   collapseBtn.style.marginLeft = '12px';
      }
    }
  });

// Closing Modal
span.onclick = function() {
    modal.style.display = "none";
    delete titleInput.dataset.editingTaskId;
}
  // Closes Modal when clicking outside of it     
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

// Enter = Click
form.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        okTaskBtn.click(); 
    }
});

function formatDateForInput(dateString) {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset(); // Get the timezone offset in minutes
    date.setMinutes(date.getMinutes() + offset); // Adjust the date by the timezone offset
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  }
  
  