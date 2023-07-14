const collapseBtn = document.getElementById('collapseBtn');
const nav = document.querySelector('nav');
const content = document.querySelector('.content');
const addTaskBtn = document.getElementById('addTask')
let taskCounter = 0;
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];


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

addTaskBtn.addEventListener('click', function() {
    taskCounter++;

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
            taskTitle.textContent = 'New Task';

            const taskCategory = document.createElement('div');
            taskCategory.classList.add('taskCategory');
            taskCategory.textContent = '(Category)';

            taskPrim.appendChild(checkbox);
            taskPrim.appendChild(taskTitle);
            taskPrim.appendChild(taskCategory);

        const taskSec = document.createElement('div');
        taskSec.classList.add('taskSec');
        taskDiv.appendChild(taskSec);

            const taskDueDate = document.createElement('div');
            taskDueDate.classList.add('taskDueDate');
            taskDueDate.textContent = '01/01/2023';

            const taskImportance = document.createElement('div');
            taskImportance.classList.add('taskDueDate');
            const importanceImg = document.createElement('img');
            importanceImg.src = './images/warning_red.png';
            importanceImg.classList.add('symbol');
            taskImportance.appendChild(importanceImg);

            const taskOptions = document.createElement('div');
            taskOptions.classList.add('taskOptions');
            taskOptions.textContent = '︙'

            taskSec.appendChild(taskDueDate);
            taskSec.appendChild(taskImportance);
            taskSec.appendChild(taskOptions);


    const linebreak = document.createElement('hr');
  
    tasksContainer.appendChild(taskDiv);
    tasksContainer.appendChild(linebreak);

    // Open / Edit Tasks
    taskDiv.addEventListener('click', function(event) {
        // Stop propagation to prevent this event from triggering on checkbox click
        event.stopPropagation();
        
        console.log(`Task div clicked: ${this.id}`);
        
        // Fill the modal with the relevant information
        document.getElementById("modalTitle").textContent = taskTitle.textContent;
        document.getElementById("modalCategory").textContent = taskCategory.textContent;
        document.getElementById("modalDueDate").textContent = taskDueDate.textContent;
        const importance = document.getElementById("modalImportance");
        importance.src = importanceImg.src;
        importance.classList.add('symbol');
        

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
