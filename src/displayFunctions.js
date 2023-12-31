import { categories } from "./categoryFunctions";
import { formatDateForInput } from "./helperFunctions";
// import { currentCategory } from "./domElements";

export function updatePageTitle(selectedCategoryBtn){
  //Apply page title based on categry
  pageTitle.textContent = selectedCategoryBtn.textContent;

  // Change page title according to selected button
  let selectedCatBtn = window.getComputedStyle(selectedCategoryBtn);
  let bgColor = selectedCatBtn.backgroundColor;
  let fontColor = selectedCatBtn.color;
  pageTitle.style.backgroundColor = bgColor;
  pageTitle.style.color = fontColor;
  pageTitle.dataset.catId = selectedCategoryBtn.dataset.catId;
}

export function updatePageTasks(selectedTimeline, selectedCategory) {
  // Loop through all taskContainerDiv elements 
  const allTaskContainerDivs = document.querySelectorAll('.taskContainerDiv');
  allTaskContainerDivs.forEach((taskContainerDiv) => {
      const taskDiv = taskContainerDiv.querySelector('.taskDiv'); // Get the taskDiv inside the current taskContainerDiv
      const taskId = taskDiv.dataset.taskId;
      
      const task = getTaskById(taskId); // Retrieve the task object by ID

      // Check if the task's due date is between startDate and selectedTimeline
      const taskDueDate = new Date(formatDateForInput(task.dueDate));
      taskDueDate.setHours(0, 0, 0, 0);

      // Assign the task category to taskCategory
      const taskCategory = task.category;

      if ((selectedTimeline === null || taskDueDate <= selectedTimeline) && (selectedCategory === "All Inbox" || taskCategory.name === selectedCategory)) {
          // Show the taskContainerDiv if its due date is between startDate and endDate, and category matches
          taskContainerDiv.style.display = 'block';
      } else {
          // Hide the taskContainerDiv if its due date is outside the range or category doesn't match
          taskContainerDiv.style.display = 'none';
      }

      //Helper function
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
  });
};

export function sort(sortOption){
  // 1. Extract and store the relevant data from each taskContainerDiv
  const taskContainerDivs = document.querySelectorAll('.taskContainerDiv');
  const dataToSort = [];

  taskContainerDivs.forEach((taskContainerDiv) => {
      const taskDueDate = taskContainerDiv.querySelector('.taskDueDate').textContent; // Extract taskDueDate
      const taskPriority = taskContainerDiv.querySelector('.taskPriority img').src; // Extract taskPriority
      const taskPriorityFilename = taskPriority.substring(taskPriority.lastIndexOf('/') + 1);

      // Store the data and the taskContainerDiv for sorting
      dataToSort.push({
          taskContainerDiv,
          taskDueDate,
          taskPriorityFilename,
      });
  });

  // 2. Sort the data based on your sorting criteria (e.g., taskDueDate or taskPriority)
  if(sortOption === 'date'){
    sortByDate();
  } else if(sortOption === 'priority'){
    sortByPriority();
  }

  function sortByDate(){
    dataToSort.sort((a, b) => {
      return new Date(a.taskDueDate) - new Date(b.taskDueDate);
    });
  }

  function sortByPriority(){
    dataToSort.sort((a, b) => {
      // Get the taskPriority from taskData property and convert it to a numeric value for comparison
      const priorityValueA = getPriorityValue(a.taskPriorityFilename);
      const priorityValueB = getPriorityValue(b.taskPriorityFilename);

      return priorityValueB - priorityValueA;
    });

    function getPriorityValue(taskPrioritySrc){ //Needed for sort
      switch (taskPrioritySrc) {
        case "warning-333.png":
            return 3;
        case "warning-222.png":
            return 2;
        case "warning-111.png":
            return 1;
        case "warning_grey.png":
            return 0;
        default:
            return -1; // Default value for undefined or other sources
      }
    }
  }

  // 3. Reinsert the sorted taskContainerDivs into the parent container
  const parentContainer = document.querySelector('.tasksContainer');

  // Remove all taskContainerDivs from the parent container
  taskContainerDivs.forEach((taskContainerDiv) => {
    parentContainer.removeChild(taskContainerDiv);
  });

  // Append the sorted taskContainerDivs back to the parent container in the desired order
  dataToSort.forEach((data) => {
    parentContainer.appendChild(data.taskContainerDiv);
  });
}


