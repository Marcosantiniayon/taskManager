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
  const taskDivArray = []; // Create an empty array to store taskDivs

  // Loop through allTaskContainerDivs and store each taskDiv into the taskDivArray
  const allTaskContainerDivs = document.querySelectorAll('.taskContainerDiv');
  allTaskContainerDivs.forEach((taskContainerDiv) => {
      const taskDiv = taskContainerDiv.querySelector('.taskDiv'); 
      if(taskDiv){ //Get each tasks's data (due date and priority) 
        getTaskData(taskDiv);
        taskDivArray.push(taskDiv); // Push the taskDiv into the array if it exists
      }
  });

  if(sortOption === 'date'){
    // Sort by earliest due date
    taskDivArray.sort((a, b) => { 
      //a & b represent the task div. 

      // Get the taskDueDate from taskData property for each task div (a &b)
      const dueDateA = new Date(a.taskData.taskDueDate);
      const dueDateB = new Date(b.taskData.taskDueDate);

      // Compare the due dates
      return dueDateA - dueDateB;
    });
  } else if(sortOption === 'priority'){
    // Sort taskDivArray by taskPriority
    taskDivArray.sort((b, a) => {

      // Get the taskPriority img elements from the taskDiv elements
      const priorityImgA = a.querySelector('.taskPriority img');
      const priorityImgB = b.querySelector('.taskPriority img');

      // Extract the src attribute value from the img elements
      const prioritySourceA = priorityImgA ? priorityImgA.getAttribute('src') : '';
      const prioritySourceB = priorityImgB ? priorityImgB.getAttribute('src') : '';

      // Get the taskPriority from taskData property and convert it to a numeric value
      const priorityValueA = getPriorityValue(prioritySourceA);
      const priorityValueB = getPriorityValue(prioritySourceB);

      console.log(priorityValueA);
      console.log(priorityValueB);

      // Compare the priority values
      return priorityValueA - priorityValueB;
    });
  }
  console.log(taskDivArray);


  // Helper functions
  function getTaskData(taskDiv){
    // Get the taskDueDate and taskPriority elements within the taskDiv
    const taskDueDate = taskDiv.querySelector('.taskDueDate').innerHTML;
    const taskPriority = taskDiv.querySelector('.taskPriority').innerHTML;
  
    // Add taskData as a property of the taskDiv element
    taskDiv.taskData = {
      taskDueDate,
      taskPriority,
    };
  }
  function getPriorityValue(taskPrioritySrc){
    switch (taskPrioritySrc) {
      case "./images/warning-333.png":
          return 3;
      case "./images/warning-222.png":
          return 2;
      case "./images/warning-111.png":
          return 1;
      case "./images/warning_grey.png":
          return 0;
      default:
          return -1; // Default value for undefined or other sources
    }
  }

}





