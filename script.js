const collapseBtn = document.getElementById('collapseBtn');
const addTaskBtn = document.getElementById('addTaskBtn')
const tasksContainer = document.querySelector('.tasksContainer');
const nav = document.querySelector('nav');
const content = document.querySelector('.content');

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
      console.log('collapse');
    } else {
      nav.style.display = 'none';
      nav.style.zIndex = '';
      content.style.gridColumn = '1 / -1';
      content.classList.remove('overlay');
      console.log('expand');
    }
  } else {
    if (navDisplayStyle === 'none') {
      nav.style.display = '';
      nav.style.zIndex = '';
      content.style.gridColumn = '';
      content.classList.remove('overlay');
      console.log('collapse');
    } else {
      nav.style.display = 'none';
      nav.style.zIndex = '';
      content.style.gridColumn = '1 / -1';
      content.classList.remove('overlay');
      console.log('expand');
    }
  }
});

addTaskBtn.addEventListener('click', function() {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('taskDiv');

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
            taskImportance.textContent = '(!)';

            const taskOptions = document.createElement('div');
            taskOptions.classList.add('taskOptions');
            taskOptions.textContent = '︙'

            taskSec.appendChild(taskDueDate);
            taskSec.appendChild(taskImportance);
            taskSec.appendChild(taskOptions);


    const linebreak = document.createElement('hr');
  
    tasksContainer.appendChild(taskDiv);
    tasksContainer.appendChild(linebreak);

    checkbox.addEventListener('change', function() {
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