// Need to figure out where these go
let selectedCategory = "All Inbox";
let selectedEndDate = getCurrentDate();
let taskCounter = 0;

let lastCatId = Math.max(...Array.from(categoryButtons).map(btn => parseInt(btn.dataset.catId)));


import { 
    content, nav,modal,span,catModal,spanCatModal,tasksContainer,form,pageTitle,collapseBtn,createTaskBtn,okTaskBtn,cancelTaskBtn,deleteBtnModal,newCatBtn,okCatBtn,cancelCatBtn,inboxBtn,responsibilitiesBtn,eventsBtn,programmingBtn,titleInput,categorySelect,dueDateSelect,prioritySelect,descriptionInput,categoryButtons,
  } from './domElements';
// import { Task } from './task';
import {initializeTaskCreation, addTask, editTask, initializeModalDeleteBtn} from'./taskFunctions';

// const task = new Task(id, title, categoryObject, dueDate, priority, description);
//Task Functions
initializeTaskCreation();
// openTaskModalForEditing(task);
addTask(title, category, categoryObject, dueDate, importance, description);
editTask(title, categoryObject, dueDate, importance, description);
initializeModalDeleteBtn();
deleteTask(taskId);

function formatDateForInput(dateString) {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset(); // Get the timezone offset in minutes
    date.setMinutes(date.getMinutes() + offset); // Adjust the date by the timezone offset
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
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
//Checks if we are edditing or creating a new cat  
let currentMode = null;
let catID;

newCatBtn.addEventListener('click', function() {
   currentMode = 'new';
   catModal.style.display = "block";
});
function editCategory(){
    pageTitle.addEventListener('click', function(){
        catID = parseInt(this.dataset.catId);
        currentMode = 'edit';
        openCatModalForEditing(pageTitle, catID);
    });
    function openCatModalForEditing(pageTitle, catID){

        console.log('Editing category with ID:', catID);
        console.log(pageTitle.textContent);
        console.log(pageTitle.style.backgroundColor);

        
        let catTitle = document.getElementById('catTitle');
        let colorDisplay = document.getElementById('colorDisplay');

        // Set the form inputs to the task's values
        catTitle.value = pageTitle.textContent;
        colorDisplay.style.backgroundColor = pageTitle.style.backgroundColor;
        
        // Show the modal
        catModal.style.display = "block";
    }
} editCategory();

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
            catID = parseInt(this.dataset.catId);
    
            // Set styling to page title
            filterPageChanges(this);
            // Apply the filter
            filterTasksByDateAndCategory(selectedEndDate, selectedCategory, catID);
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
function filterTasksByDateAndCategory(endDate, selectedCategory, catID) {
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
    pageTitle.dataset.catId = catID;
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



