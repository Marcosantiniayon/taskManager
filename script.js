const content = document.querySelector('.content');
const nav = document.querySelector('nav');
const modal = document.querySelector('.modal');
const tasksContainer = document.querySelector('.tasksContainer');
let form = document.querySelector('form');
const collapseBtn = document.getElementById('collapseBtn');
const createTaskBtn = document.getElementById('createTask');
const okTaskBtn = document.getElementById('okTaskBtn')
const cancelTaskBtn = document.getElementById('cancelTaskBtn');
let deleteButton = document.getElementById('delete');
let titleInput= document.getElementById("title")
let categorySelect = document.getElementById("category");
let dueDateSelect = document.getElementById("dueDate");
let prioritySelect = document.getElementById("priority");
let descriptionInput = document.getElementById("description");


let span = document.getElementsByClassName("close")[0];
let taskCounter = 0;
// let categories = [];

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

// Category Constructor
class Category {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(taskTitle) {
        this.tasks = this.tasks.filter(task => task.title !== taskTitle);
    }
}
    // Initialize default categories
    let defaultCategories = ["Inbox", "Chores", "Work", "Programming"];
    let categories = defaultCategories.map(categoryName => new Category(categoryName));

// Brings up new task modal
createTaskBtn.addEventListener('click', function() {
    // Reset the modal input fields
    titleInput.value = "";
    categorySelect.value = "Inbox";
        let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
    dueDateSelect.value = today;
    prioritySelect.value = "Low";
    descriptionInput.value = "";

    // Show the modal
    modal.style.display = "block";
});

// Creates task after submitting modal form
okTaskBtn.addEventListener('click', function(event) {
  if (document.querySelector('form').reportValidity()) {
    event.preventDefault();
    taskCounter++;
    titleInput.classList.remove('error');
    
    let title = document.getElementById("title").value;
    let category = document.getElementById("category").value;
    let categoryValue = document.getElementById("category").value;
    let categoryObject = categories.find(category => category.name === categoryValue);
    let dueDate = document.getElementById("dueDate").value;
    let importance = document.getElementById("priority").value;
    let description = document.getElementById("description").value;

    // Check if we're creating a new task or updating an existing one
    if (titleInput.dataset.editingTaskId !== undefined) {
        // We're editing an existing task
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

        // Update the task object's properties
        taskObject.title = title;
        taskObject.category = categoryObject;
        taskObject.dueDate = dueDate;
        taskObject.priority = importance;
        taskObject.description = description;

        // Update the taskDiv's textContent to reflect the new properties
        let taskDiv = document.querySelector(`#task-${taskId}`);
        taskDiv.querySelector('.taskTitle').textContent = title;
        taskDiv.querySelector('.taskCategory').textContent = `(${categoryValue})`;
        taskDiv.querySelector('.taskDueDate').textContent = dueDate;
        let taskPriorityImg = taskDiv.querySelector('.symbol');
            if(importance == "Highest"){taskPriorityImg.src = "./images/warning-333.png"}
            else if(importance == "High"){taskPriorityImg.src = "./images/warning-222.png"}
            else if(importance == "Medium"){taskPriorityImg.src = "./images/warning-111.png"}
            else {taskPriorityImg.src = "./images/warning_grey.png"}

        delete titleInput.dataset.editingTaskId;
        modal.style.display = "none";
    } else {

    // Create Task Object
    let newTask = new Task(taskCounter, title, categoryObject, dueDate, importance, description);
    categoryObject.addTask(newTask);
    
    // Container div for the task and the line break
    const taskContainerDiv = document.createElement('div');

    // Add Task Div
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('taskDiv');
    taskDiv.id = `task-${taskCounter}`;
    taskDiv.dataset.taskId = taskCounter;

        const taskPrim = document.createElement('div');
        taskPrim.classList.add('taskPrim');
        taskDiv.appendChild(taskPrim);

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';

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
            taskDueDate.textContent = dueDate;

            const taskPriority = document.createElement('div');
            taskPriority.classList.add('taskDueDate');
            const taskPriorityImg = document.createElement('img');
            if(prioritySelect.value == "Highest"){taskPriorityImg.src = "./images/warning-333.png"}
            else if(prioritySelect.value == "High"){taskPriorityImg.src = "./images/warning-222.png"}
            else if(prioritySelect.value == "Medium"){taskPriorityImg.src = "./images/warning-111.png"}
            else {taskPriorityImg.src = "./images/warning_grey.png"}
            taskPriorityImg.classList.add('symbol');
            taskPriority.appendChild(taskPriorityImg);
            const taskDelete = document.createElement('img');
            taskDelete.id = `taskDelete-${taskCounter}`;
            taskDelete.src = "./images/delete.png"; // Change to your delete image's path
            taskDelete.classList.add('symbol');

            taskSec.appendChild(taskDueDate);
            taskSec.appendChild(taskPriority);
            taskSec.appendChild(taskDelete);

    const linebreak = document.createElement('hr');

    taskContainerDiv.appendChild(taskDiv);
    taskContainerDiv.appendChild(linebreak);

    tasksContainer.appendChild(taskContainerDiv);

    // Open / Edit Tasks
    taskDiv.addEventListener('click', function(event) {

    // Check if delete button was clicked
    if (event.target === taskDelete || event.target === checkbox) {
        return; // If delete button was clicked, don't open modal
    }

        console.log(`Task div clicked: ${this.id}`);
    
        // Find the task object that corresponds to this taskDiv
        let taskId = this.dataset.taskId;
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
    
        // Fill the modal with the task object's current data
        titleInput.value = taskObject.title;
        categorySelect.value = taskObject.category.name;
        dueDateSelect.value = taskObject.dueDate;
        prioritySelect.value = taskObject.priority;
        descriptionInput.value = taskObject.description;
    
        // Set the editingTaskId to taskId so that we know which task is being edited
        titleInput.dataset.editingTaskId = taskId;
    
        // Show the modal
        modal.style.display = "block";
    }, true);

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

    modal.style.display = "none";

    } 
  } else {  titleInput.classList.add('error'); }
});
    // Remove the error class when the title input value changes
    titleInput.addEventListener('input', function() {
        this.classList.remove('error');
    });

    cancelTaskBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the form from submitting
        modal.style.display = "none";
    });


//Delete Button (inside Modal)
    deleteButton.addEventListener('click', function(event) {
        event.stopPropagation();
    
        // Get taskId from the editingTaskId data attribute
        let taskId = titleInput.dataset.editingTaskId;
    
        if (!taskId) {
            console.log('No task is currently being edited');
            return;
        }
    
        deleteTask(taskId);
    });

 //Delete Button (Outside Modal)
document.addEventListener('click', function(event) {
    if (event.target.id.startsWith('taskDelete-')) {
        event.stopPropagation();
    
        // Get taskId from the id of the clicked element
        let taskId = event.target.id.replace('taskDelete-', '');
    
        deleteTask(taskId);
    }
});

// Delete Task Function
function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) {
        // User cancelled the delete operation

        // Find the task object that corresponds to this taskId
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

        // Set the editingTaskId to taskId so that we know which task is being edited
        titleInput.dataset.editingTaskId = taskId;

        // Show the modal
        modal.style.display = "block";

        return;
    }

    // Find the task object that corresponds to this taskId
    let taskObject;
    let taskCategory;
    for(let category of categories) {
        taskObject = category.tasks.find(task => task.id == taskId);
        if(taskObject) {
            taskCategory = category;
            break;
        }
    }
    if (taskObject === undefined) {
        console.error(`No task found with id ${taskId}`);
        // Clear the editingTaskId data attribute
        delete titleInput.dataset.editingTaskId;
        return;
    }

    // Remove the task from the category's tasks array
    taskCategory.removeTask(taskObject.title);

    // Remove the task div from the DOM
    let taskContainerDiv = document.querySelector(`#task-${taskId}`).parentNode;
    taskContainerDiv.remove();

    // Hide the modal
    modal.style.display = "none";
}
        
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
