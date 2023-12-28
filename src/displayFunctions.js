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

  // Loop through all taskContainerDiv elements 
  const allTaskContainerDivs = document.querySelectorAll('.taskContainerDiv');
  allTaskContainerDivs.forEach((taskContainerDiv) => {
      const taskDiv = taskContainerDiv.querySelector('.taskDiv'); 
      if(taskDiv){
        taskDivArray.push(taskDiv); // Push the taskDiv into the array if it exists
      }
      // const taskId = taskDiv.dataset.taskId;
      // const task = getTaskById(taskId); // Retrieve the task object by ID
  });
  console.log(taskDivArray);


  //default sort


}


