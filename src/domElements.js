import { Task, taskCounter } from "./taskFunctions";
import { getCurrentDate, formatDateForInput, isDarkColor, rgbToHex } from "./helperFunctions";
import { filterPageChanges, removeFilters, filterTasksByDateAndCategory } from "./displayFunctions";
import { Category, categories, catID, currentMode } from "./categoryFunctions";


const content = document.querySelector('.content');
const nav = document.querySelector('nav');
const modal = document.querySelector('#modal');
const catModal = document.querySelector('#catModal');
const tasksContainer = document.querySelector('.tasksContainer');
const collapseBtn = document.getElementById('collapseBtn');
const createTaskBtn = document.getElementById('createTask');
const okTaskBtn = document.getElementById('okTaskBtn')
const cancelTaskBtn = document.getElementById('cancelTaskBtn');
const deleteBtnModal = document.getElementById('delete');
const newCatBtn = document.getElementById('newCatBtn');
const okCatBtn = document.getElementById('okCatBtn');
const cancelCatBtn = document.getElementById('cancelCatBtn');
const inboxBtn = document.getElementById('All Inbox')
const responsibilitiesBtn = document.getElementById('Responsibilities');
const eventsBtn = document.getElementById('Events & Social');
const programmingBtn = document.getElementById('Programming Course');
const colorPicker = document.getElementById('colorPicker');
const colorDisplay = document.getElementById('colorDisplay');
const allBtn = document.getElementById('allBtn');
const todayBtn = document.getElementById('todayBtn');
const thisWeekBtn = document.getElementById('thisWeekBtn');
const thisMonthBtn = document.getElementById('thisMonthBtn');
const pageTimeline = document.getElementById('pageTimeline');
let span = document.getElementsByClassName("close")[0];
let spanCatModal = document.getElementsByClassName("closeCatModal")[0];
let form = document.querySelector('form');
let pageTitle = document.getElementById('pageTitle');

let titleInput = document.getElementById("title")
let categorySelect = document.getElementById("category");
let dueDateSelect = document.getElementById("dueDate");
let prioritySelect = document.getElementById("priority");
let descriptionInput = document.getElementById("description");
let categoryButtons = document.querySelectorAll('.catBtns');

// let defaultCategory = document.getElementById('All Inbox');
let selectedCategory = 'All Inbox';
let selectedCategoryBtn = document.getElementById(selectedCategory);
let selectedEndDate = getCurrentDate();

export {
  content, nav,modal,span,catModal, spanCatModal,tasksContainer,form,pageTitle,collapseBtn,createTaskBtn,okTaskBtn,cancelTaskBtn,deleteBtnModal,newCatBtn,okCatBtn,cancelCatBtn,inboxBtn,responsibilitiesBtn,eventsBtn,programmingBtn,titleInput,categorySelect,dueDateSelect,prioritySelect,descriptionInput,categoryButtons,allBtn, todayBtn, thisWeekBtn, thisMonthBtn, pageTimeline, colorPicker, colorDisplay  
};

export function initializeTaskEventListeners(){
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
        
        filterTasksByDateAndCategory(selectedEndDate, selectedCategory);
    
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
    selectedCategory = categorySelect.value;
    selectedCategoryBtn = document.getElementById(selectedCategory);

    console.log(selectedCategoryBtn);
    filterPageChanges(selectedCategoryBtn);
  });

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
  titleInput.addEventListener('input', function() {
      // Remove the error class when the title input value changes
      this.classList.remove('error');
  });
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
  
      // Delete the taskContainerDiv
      let taskContainerDiv = taskDiv.parentNode.parentNode;
      taskContainerDiv.remove(); // Remove taskContainerDiv
  
      // Hide the modal
      modal.style.display = "none";
  
      // Clear the editingTaskId since we've just deleted the task
      delete titleInput.dataset.editingTaskId;
  }
}
export function initializeCatEventListeners(){
  newCatBtn.addEventListener('click', function() {
      currentMode = 'new';
      catModal.style.display = "block";
      catTitle.value = "";
      colorDisplay.style.backgroundColor = '#8a59b9';
      console.log(colorDisplay.style.backgroundColor);

   });
   okCatBtn.addEventListener('click', function(event) {
       event.preventDefault(); // Prevent the form from submitting

       if (currentMode === 'new') {

           // Get the category name and color from the form inputs
           let catTitle = document.getElementById('catTitle').value;
           let catColor = document.getElementById('colorPicker').value;

           //Set default cat color picker
           catColor = colorDisplay.style.backgroundColor;
           console.log(catColor);
   
           // Create a new category instance
           let newCategory = new Category(catTitle, catColor);
           categories.push(newCategory);
   
           // Create a new list item
           let newCategoryElement = document.createElement('li');
           let newButton = document.createElement('button');
           newButton.innerText = catTitle;
           newButton.id = catTitle;
           newButton.classList.add('catBtns');
           newButton.style.backgroundColor = catColor;
           newButton.dataset.catId = newCategory.catId;
   
           if (isDarkColor(catColor)) {
            console.log(catColor);
            console.log('dark');
            newButton.style.color = 'white';
           } else {
            console.log(catColor);
            console.log('light');
            newButton.style.color = 'black';
           }
           
        newCategoryElement.appendChild(newButton);
        document.getElementById('categoriesList').appendChild(newCategoryElement);
        initializeCatFilterEvListeners();
    } else if (currentMode === 'edit') {
           //Retrieve the category from the categories array based on the catID
           console.log(catID);
           if (typeof catID !== "number") {
               console.error('catId is not a number at [description of the code location]', catID);
           }
           let editingCategory = categories.find(cat => cat.catId === catID);
       
           //Update the category values
           if (editingCategory) {
               editingCategory.name = document.getElementById('catTitle').value;
               editingCategory.color = document.getElementById('colorPicker').value;
       
               //Update the UI element (button in this case) representing the category
               let associatedButton = document.querySelector(`button[data-cat-id="${catID}"]`);
               if (associatedButton) {
                   associatedButton.innerText = editingCategory.name;
                   associatedButton.style.backgroundColor = editingCategory.color;
       
                   //Check color brightness to adjust text color for better visibility
                   if (isDarkColor(editingCategory.color)) {
                       associatedButton.style.color = 'white';
                       pageTitle.style.color = 'white';
                       console.log(pageTitle.style.color);
                   } else {
                       associatedButton.style.color = 'black';
                       pageTitle.style.color = 'black';
                       console.log(pageTitle.style.color);
                   }
               }
           } else {
               console.error('Could not find category with ID:', catID);
           }

           //Update page title
           pageTitle.innerHTML = catTitle.value;
           console.log(colorPicker.value);
           pageTitle.style.backgroundColor = colorPicker.value;
       }
       updateCategoryDropdown();
      //  filterBtnsEvListeners();
   
       catModal.style.display = "none";
   
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
   });
   cancelCatBtn.addEventListener('click', function(event) {    
    event.preventDefault();
    catModal.style.display = "none";

   });
   pageTitle.addEventListener('click', function(){
       catID = parseInt(this.dataset.catId);
       currentMode = 'edit';
       openCatModalForEditing(pageTitle, catID);
       function openCatModalForEditing(pageTitle, catID){
           let catTitle = document.getElementById('catTitle');
           let colorDisplay = document.getElementById('colorDisplay');
       
           // Set the form inputs to the task's values
           catTitle.value = pageTitle.textContent;
           colorDisplay.style.backgroundColor = pageTitle.style.backgroundColor;
           
           // Show the modal
           catModal.style.display = "block";
       }
   });
   colorDisplay.addEventListener('click', function() {
    // Get the RGB color & convert to hex. Then set the colorPicker value to the hex
    let rgbColor = colorDisplay.style.backgroundColor;
    let hexColor = rgbToHex(rgbColor);
    colorPicker.value = hexColor;
    colorPicker.click();
      
    });
   colorPicker.addEventListener('input', function() {     // When you pick a color, update the display
      colorDisplay.style.background = colorPicker.value;
    });
};
export function initializeDefaultFilters(){
  selectedCategoryBtn.classList.add('selectedFilter')
  filterPageChanges(selectedCategoryBtn);
  let currentTimeline = document.getElementById('allBtn');
  currentTimeline.classList.add('selectedFilter')
};
export function initializeTimeFilterEvListeners(){
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
};
export function initializeCatFilterEvListeners(){
  //Reselect category buttons to pick up any newly added one  
  categoryButtons = document.querySelectorAll('.catBtns'); 
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
}
export function initializeDisplaySettings(){
  collapseBtn.addEventListener('click', function() { // Nav Collapse & Expand
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
  span.onclick = function() { // Closes task modal on clicking X
      modal.style.display = "none";
      delete titleInput.dataset.editingTaskId;
  }; 
  spanCatModal.onclick = function() { // Closes catmodal on clicking X
      catModal.style.display = "none";
  }     
  window.onclick = function(event) { // Closes Modals when clicking outside of it 
      if (event.target == modal) {
        modal.style.display = "none";
      } else if(event.target == catModal) {
          catModal.style.display = "none";
        }
  }
  form.addEventListener('keydown', function(event) { // Enter acts as a click
      if (event.key === "Enter") {
          event.preventDefault(); 
          okTaskBtn.click(); 
      }
  });
  
};