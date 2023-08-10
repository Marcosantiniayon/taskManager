const content = document.querySelector('.content');
const nav = document.querySelector('nav');
const modal = document.querySelector('#modal');
let span = document.getElementsByClassName("close")[0];
const catModal = document.querySelector('#catModal');
let spanCatModal = document.getElementsByClassName("closeCatModal")[0];
const tasksContainer = document.querySelector('.tasksContainer');
let form = document.querySelector('form');
let pageTitle = document.getElementById('pageTitle');
const collapseBtn = document.getElementById('collapseBtn');
const createTaskBtn = document.getElementById('createTask');
const okTaskBtn = document.getElementById('okTaskBtn')
const cancelTaskBtn = document.getElementById('cancelTaskBtn');
const deleteBtnModal = document.getElementById('delete');
const newCatBtn = document.getElementById('newCatBtn');
const okCatBtn = document.getElementById('okCatBtn')
const cancelCatBtn = document.getElementById('cancelCatBtn')
// const inboxBtn = document.getElementById('inboxBtn')
// const responsibilitiesBtn = document.getElementById('responsibilitiesBtn')
// const eventsBtn = document.getElementById('eventsBtn')
// const programmingBtn = document.getElementById('programmingBtn')
let titleInput= document.getElementById("title")
let categorySelect = document.getElementById("category");
let dueDateSelect = document.getElementById("dueDate");
let prioritySelect = document.getElementById("priority");
let descriptionInput = document.getElementById("description");
let selectedCategory = "All Inbox";
let selectedEndDate = getCurrentDate();
let categoryButtons = document.querySelectorAll('.catBtns');
let lastCatId = Math.max(...Array.from(categoryButtons).map(btn => parseInt(btn.dataset.catId)));
let taskCounter = 0;


// ---------------------------- TASKS ----------------------------
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
// Add | Edit Tasks
createTaskBtn.addEventListener('click', function() { // Brings up new task modal 
    // Set default inputs
    titleInput.value = "";
    categorySelect.value = "All Inbox";
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
function openTaskModalForEditing(task){
console.log(task);
// Set the form inputs to the task's values
titleInput.value = task.title;
categorySelect.value = task.category.name;
dueDateSelect.value = task.dueDate;
prioritySelect.value = task.priority;
descriptionInput.value = task.description;

// Set the data attribute on the title input to the task's id so we know which task is being edited
titleInput.dataset.editingTaskId = task.id;

// Show the modal
modal.style.display = "block";
}
cancelTaskBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the form from submitting
    modal.style.display = "none";
});
okTaskBtn.addEventListener('click', function(event) { //Calls addTask or editTask
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
function addTask(title, category, categoryObject, dueDate, importance, description){
    // Create Task Object 
    let newTask = new Task(taskCounter, title, categoryObject, dueDate, importance, description);

    taskCounter++;
    console.log(categoryObject);
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

        taskDiv.addEventListener('click', function() {
            openTaskModalForEditing(newTask);
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

            taskPrim.appendChild(checkbox);taskPrim.appendChild(taskTitle);taskPrim.appendChild(taskCategory);

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
                } deleteTask(taskId);
            });

              taskSec.appendChild(taskDueDate); taskSec.appendChild(taskPriority);
            taskBigDiv.appendChild(taskDiv);taskBigDiv.appendChild(deleteBtnBigDiv);

        const linebreak = document.createElement('hr');

        taskContainerDiv.appendChild(taskBigDiv);taskContainerDiv.appendChild(linebreak);tasksContainer.appendChild(taskContainerDiv);    
    } addTaskDiv(taskId, title, category, dueDate, taskCounter, prioritySelect);
    
    // selectedCategory = category;

    filterTasksByDateAndCategory(selectedEndDate, selectedCategory);
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
    taskObject.dueDate = dueDate;
    taskObject.priority = importance;
    taskObject.description = description;

    // Log the taskId and taskDiv here
    console.log('editing task, title: ' + title + ' id: ' + taskId);
    let taskDiv = document.getElementById(taskId);

    // Update the taskDiv's textContent to reflect the new values
    taskDiv.querySelector('.taskTitle').textContent = title;
    taskDiv.querySelector('.taskCategory').textContent = `(${categoryObject.name})`;
    taskDiv.querySelector('.taskDueDate').textContent = formatDateForInput(dueDate);
    let taskPriorityImg = taskDiv.querySelector('.symbol');
        if(importance == "Highest"){taskPriorityImg.src = "./images/warning-333.png"}
        else if(importance == "High"){taskPriorityImg.src = "./images/warning-222.png"}
        else if(importance == "Medium"){taskPriorityImg.src = "./images/warning-111.png"}
        else {taskPriorityImg.src = "./images/warning_grey.png"}

    delete titleInput.dataset.editingTaskId;
    modal.style.display = "none";
    filterTasksByDateAndCategory(selectedEndDate, selectedCategory);
}
function formatDateForInput(dateString) {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset(); // Get the timezone offset in minutes
    date.setMinutes(date.getMinutes() + offset); // Adjust the date by the timezone offset
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  }

//Delete Task
deleteBtnModal.addEventListener('click', function(event) {
    event.stopPropagation();

    // Get taskId from the editingTaskId data attribute
    let taskId = titleInput.dataset.editingTaskId;

    if (!taskId) {
        console.log('No task is currently being edited');
        return;
    }

    deleteTask(taskId);
});  // (inside modal). Outside modal ev listener is inside addTaskDiv evlistener 'DeleteBtnBigDiv'
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
titleInput.addEventListener('input', function() {
    // Remove the error class when the title input value changes
    this.classList.remove('error');
});

// ---------------------------- CATEGORIES ----------------------------
class Category {
    constructor(name, color, catId = null) {
        this.name = name;
        this.color = color;
        this.tasks = [];
        this.catId = catId || ++lastCatId;
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
let defaultCategories = initializeDefaultCategories();
let categories = [...defaultCategories]; 
function initializeDefaultCategories() {
    const categoryButtons = document.querySelectorAll('.categoriesDiv button');
    let categories = Array.from(categoryButtons).map(button => {
        let catId = parseInt(button.dataset.catId);
        if (catId > lastCatId) lastCatId = catId;
        return new Category(button.textContent.trim(), null, catId); // Passing catId to the constructor
    });

    return categories;
} 
function updateCategoryDropdown() {
    // Clear any existing options
    let categorySelect = document.getElementById('category');
    while (categorySelect.firstChild) {
        categorySelect.removeChild(categorySelect.firstChild);
    }
    // Add new options based on the categories array
    categories.forEach(category => {
        let option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
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
newCatBtn.addEventListener('click', function() {
   // Show the modal
   catModal.style.display = "block";
});
okCatBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the category name and color from the form inputs
    let catTitle = document.getElementById('catTitle').value;
    let catColor = document.getElementById('colorPicker').value;

    // Create a new category instance
    let newCategory = new Category(catTitle, catColor);
    categories.push(newCategory);

    // Create a new list item
    let newCategoryElement = document.createElement('li');
    let newButton = document.createElement('button');
    newButton.innerText = catTitle;
    newButton.classList.add('catBtns');
    newButton.style.backgroundColor = catColor;
    newButton.dataset.catId = newCategory.catId;

    if (isDarkColor(catColor)) {
        newButton.style.color = 'white';
    } else {
        newButton.style.color = 'black';
    }
    
    newCategoryElement.appendChild(newButton);
    document.getElementById('categoriesList').appendChild(newCategoryElement);

    updateCategoryDropdown();
    filterBtnsEvListeners();

    catModal.style.display = "none";
});
cancelCatBtn.addEventListener('click', function() {
    
});
//color picker
const colorPicker = document.getElementById('colorPicker');
colorPicker.value ='#8a59b9';
const colorDisplay = document.getElementById('colorDisplay');
colorDisplay.addEventListener('click', function() {
    colorPicker.click();
  });
  // When you pick a color, update the display
  colorPicker.addEventListener('input', function() {
    colorDisplay.style.background = colorPicker.value;
  });
function isDarkColor(color) {
    // Convert hex color to rgb
    let rgb;
    if (color.startsWith('#')) {
        let r = parseInt(color.slice(1, 3), 16);
        let g = parseInt(color.slice(3, 5), 16);
        let b = parseInt(color.slice(5, 7), 16);
        rgb = { r, g, b };
    } else {
        // Assume it's already an rgb color
        rgb = color;
    }

    // Calculate brightness on a scale from 0 to 255
    let brightness = Math.round(((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000);
    
    return brightness < 170; // Return true if the color is dark
}

// ---------------------------- FILTERS & DISPLAY ----------------------------

function filterBtnsEvListeners(){
    const allBtn = document.getElementById('allBtn');
    const todayBtn = document.getElementById('todayBtn');
    const thisWeekBtn = document.getElementById('thisWeekBtn');
    const thisMonthBtn = document.getElementById('thisMonthBtn');
    const pageTimeline = document.getElementById('pageTimeline');

    function removeFilters(){
        thisWeekBtn.classList.remove('selectedFilter');
        thisMonthBtn.classList.remove('selectedFilter');
        allBtn.classList.remove('selectedFilter');
        todayBtn.classList.remove('selectedFilter');
    }

    //Timeline buttons event listeners
    todayBtn.addEventListener('click', function () {
        const today = getCurrentDate();
        selectedEndDate = today;
        filterTasksByDateAndCategory(selectedEndDate, selectedCategory);
        removeFilters();
        todayBtn.classList.add('selectedFilter');
        pageTimeline.textContent = this.textContent;

    });
    thisWeekBtn.addEventListener('click', function () {
        const today = getCurrentDate();
        const oneWeekLater = new Date();
        oneWeekLater.setDate(today.getDate() + 7);
        selectedEndDate = oneWeekLater;
        filterTasksByDateAndCategory(selectedEndDate, selectedCategory);
        removeFilters();
        thisWeekBtn.classList.add('selectedFilter');
        pageTimeline.textContent = this.textContent;
    });
    thisMonthBtn.addEventListener('click', function () {
        const today = getCurrentDate();
        const oneMonthLater = new Date();
        oneMonthLater.setDate(today.getDate() + 30);
        selectedEndDate = oneMonthLater;
        filterTasksByDateAndCategory(selectedEndDate, selectedCategory);
        removeFilters();
        thisMonthBtn.classList.add('selectedFilter');
        pageTimeline.textContent = this.textContent;
    });
    allBtn.addEventListener('click', function () {
        selectedEndDate = null;
        filterTasksByDateAndCategory(selectedEndDate, selectedCategory)
        removeFilters();
        allBtn.classList.add('selectedFilter');
        pageTimeline.textContent = this.textContent;
        allBtn.classList.add('selectedFilter');

    });

    //Category buttons event listeners
    let categoryButtons = document.querySelectorAll('.catBtns');
    categoryButtons.forEach((catBtn) => {
        catBtn.addEventListener('click', function() {
            // Remove 'selectedFilter' class from all category buttons
            categoryButtons.forEach((button) => {
                button.classList.remove('selectedFilter');
            });
    
            // Add 'selectedFilter' class to the clicked button
            this.classList.add('selectedFilter');
    
            // Set selectedCategory to the clicked button's text content
            selectedCategory = this.textContent;
    
            // Set styling to page title
            filterPageChanges(this);

            // Apply the filter
            filterTasksByDateAndCategory(selectedEndDate, selectedCategory);
        });
    }); 

    function initializePageFilters(){
        let currentCategory = document.getElementById('inboxBtn');
        currentCategory.classList.add('selectedFilter')
        filterPageChanges(currentCategory);
        let currentTimeline = document.getElementById('allBtn');
        currentTimeline.classList.add('selectedFilter')
    }initializePageFilters();
    function filterPageChanges(currentCategory){
        let computedStyle = window.getComputedStyle(currentCategory);
        let bgColor = computedStyle.backgroundColor;
        let fontColor = computedStyle.color;
        pageTitle.style.backgroundColor = bgColor;
        pageTitle.style.color = fontColor;
    }
} filterBtnsEvListeners();
function getCurrentDate(){ //helper function to filter tasks
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 to compare only the dates
    return today;
}
function filterTasksByDateAndCategory(endDate, selectedCategory) {
    // Loop through all taskContainerDiv elements and check their tasks' due dates
    const allTaskContainerDivs = document.querySelectorAll('.taskContainerDiv');
    allTaskContainerDivs.forEach((taskContainerDiv) => {
        const taskDiv = taskContainerDiv.querySelector('.taskDiv'); // Get the taskDiv inside the current taskContainerDiv
        const taskId = taskDiv.dataset.taskId;
        const task = getTaskById(taskId); // Retrieve the task object by ID

        // Check if the task's due date is between startDate and endDate
        const taskDueDate = new Date(formatDateForInput(task.dueDate));
        taskDueDate.setHours(0, 0, 0, 0);

        // Check if the task's category matches the selected category
        const taskCategory = task.category;

        if ((endDate === null || taskDueDate <= endDate) && (selectedCategory === "All Inbox" || taskCategory.name === selectedCategory)) {
            // Show the taskContainerDiv if its due date is between startDate and endDate, and category matches
            taskContainerDiv.style.display = 'block';
        } else {
            // Hide the taskContainerDiv if its due date is outside the range or category doesn't match
            taskContainerDiv.style.display = 'none';
        }
    });

    //apply page title based on categry
    pageTitle.textContent = selectedCategory;
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
}; spanCatModal.onclick = function() {
    catModal.style.display = "none";
}     
window.onclick = function(event) { // Closes Modal when clicking outside of it 
    if (event.target == modal) {
      modal.style.display = "none";
    } else if(event.target == catModal) {
        catModal.style.display = "none";
      }
}
// Enter = Click
form.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        okTaskBtn.click(); 
    }
});

// Workin Progress

function editCategory(){
    pageTitle.addEventListener('click', function(){
        openCatModalForEditing(pageTitle);
    });
    function openCatModalForEditing(){
        console.log(pageTitle.textContent);
        console.log(pageTitle.style.backgroundColor);

        
        let catTitle = document.getElementById('catTitle');
        let colorDisplay = document.getElementById('colorDisplay');
        // Set the form inputs to the task's values
        catTitle.value = pageTitle.textContent;
        colorDisplay.style.backgroundColor = pageTitle.style.backgroundColor;

        
        // Set the data attribute on the title input to the task's id so we know which task is being edited
        // titleInput.dataset.editingTaskId = task.id;
        
        // Show the modal
        catModal.style.display = "block";
    }
} editCategory();

