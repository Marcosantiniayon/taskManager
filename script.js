const collapseBtn = document.getElementById('collapseBtn');
const nav = document.querySelector('nav');
const content = document.querySelector('.content');
const addTaskDiv = document.getElementById('addTask');
const okBtn = document.getElementById('okBtn')
let taskCounter = 0;
let categories = [];
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];


// Task Class
class Task {
    constructor(title = 'New Task', description, dueDate, priority) {
        this.title = title || 'New Task';
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = false; // we are assuming a new task is not completed
    }

    toggleComplete() {
        this.complete = !this.complete;
    }
}

// Category Class
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

let inboxCategory = new Category('Inbox');
categories.push(inboxCategory);

const tasksContainer = document.querySelector('.tasksContainer');

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

addTaskDiv.addEventListener('click', function() {
    // Reset the modal input fields
    document.getElementById("modalTitle").value = "New Task";
    document.getElementById("modalCategorySelect").value = "Inbox";
        // Set the current date as the default due date
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("modalDueDate").value = today;
    document.getElementById("modalImportanceSelect").src = "./images/warning_grey.png";
    document.getElementById("modalDescription").value = "";

    // Show the modal
    modal.style.display = "block";
});

okBtn.addEventListener('click', function() {
    taskCounter++;

    // Get the 'Inbox' category
    let inboxCategory = categories.find(category => category.name === 'Inbox');

    // Get the values from the modal
    let title = document.getElementById("modalTitle").value;
    let category = document.getElementById("modalCategorySelect").value;
    let dueDate = document.getElementById("modalDueDate").value;
    let importance = document.getElementById("modalImportanceSelect").value;
    let description = document.getElementById("modalDescription").value;

    // Create Task
    let newTask = new Task(title, description, dueDate, importance);
    
        // Find the category and add the task to it
        let categoryObj = categories.find(cat => cat.name === category);
        if (!categoryObj) {
            // If the category doesn't exist, create it
            categoryObj = new Category(category);
            categories.push(categoryObj);
        }
        categoryObj.addTask(newTask);
        inboxCategory.addTask(newTask);
    
    // Add Task Div
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('taskDiv');
    taskDiv.id = `task-${taskCounter}`;

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
            taskCategory.textContent = category;

            taskPrim.appendChild(checkbox);
            taskPrim.appendChild(taskTitle);
            taskPrim.appendChild(taskCategory);

        const taskSec = document.createElement('div');
        taskSec.classList.add('taskSec');
        taskDiv.appendChild(taskSec);

            const taskDueDate = document.createElement('div');
            taskDueDate.classList.add('taskDueDate');
            taskDueDate.textContent = dueDate;

            const taskImportance = document.createElement('div');
            taskImportance.classList.add('taskDueDate');
            const importanceImg = document.createElement('img');
            importanceImg.src = './images/warning_red.png';
            importanceImg.classList.add('symbol');
            taskImportance.appendChild(importanceImg);

            taskSec.appendChild(taskDueDate);
            taskSec.appendChild(taskImportance);

    const linebreak = document.createElement('hr');
  
    tasksContainer.appendChild(taskDiv);
    tasksContainer.appendChild(linebreak);

    // Open / Edit Tasks
    taskDiv.addEventListener('click', function(event) {
        // Stop propagation to prevent this event from triggering on checkbox click
        event.stopPropagation();
        
        console.log(`Task div clicked: ${this.id}`);
        
        // Fill the modal with the relevant information
        document.getElementById("modalTitle").value = taskTitle.textContent;
        document.getElementById("modalCategorySelect").value = taskCategory.textContent;
        document.getElementById("modalDueDate").value = taskDueDate.textContent;
        let importanceImg = document.getElementById("modalImportanceImg");
        importanceImg.src = taskImportance.firstChild.src;
        importance.classList.add('symbol');
        
        let modalCategorySelect = document.getElementById("modalCategorySelect");

        // Clear the dropdown
        modalCategorySelect.innerHTML = "";

        // Create a new option for each category
        for (let category of categories) {
            let option = document.createElement("option");
            option.text = category.name;
            option.value = category.name;

            // If this category is the current category of the task, select it
            if (category.name === taskCategory.textContent) {
                option.selected = true;
            }

            modalCategorySelect.appendChild(option);
        }

        // Show the modal
        modal.style.display = "block";
    });

    checkbox.addEventListener('click', function(event) {
        event.stopPropagation();
        if (this.checked) {
          taskTitle.classList.add('complete');
          taskCategory.classList.add('complete');
          taskDueDate.classList.add('complete');
          taskImportance.classList.add('complete');
        } else {
            taskTitle.classList.remove('complete');
            taskCategory.classList.remove('complete');
          taskDueDate.classList.remove('complete');
          taskImportance.classList.remove('complete');
        }
      });

});

// Closing Modal
span.onclick = function() {
    modal.style.display = "none";
  }
  // Closes Modal when clicking outside of it     
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
