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

// export function sort(sortOption){
//   const taskDivArray = []; // Create an empty array to store taskDivs

//   // Loop through allTaskContainerDivs and store each taskDiv into the taskDivArray
//   const allTaskContainerDivs = document.querySelectorAll('.taskContainerDiv');
//   allTaskContainerDivs.forEach((taskContainerDiv) => {
//       const taskDiv = taskContainerDiv.querySelector('.taskDiv'); 
//       if(taskDiv){ //Get each tasks's data (due date and priority) 
//         getTaskData(taskDiv);
//         taskDivArray.push(taskDiv); // Push the taskDiv into the array if it exists
//       }
//   });

  // if(sortOption === 'date'){
  //   taskDivArray.sort((a, b) => { 

  //     // Get the taskDueDate from taskData property for each task div (a & b)
  //     const dueDateA = new Date(a.taskData.taskDueDate);
  //     const dueDateB = new Date(b.taskData.taskDueDate);

  //     // Compare the due dates
  //     return dueDateA - dueDateB;
  //   });
  // } else if(sortOption === 'priority'){
  //   // Sort taskDivArray by taskPriority
  //   taskDivArray.sort((b, a) => {

  //     // Get the taskPriority img elements from the taskDiv elements
  //     const priorityImgA = a.querySelector('.taskPriority img');
  //     const priorityImgB = b.querySelector('.taskPriority img');

  //     // Extract the src attribute value from the img elements
  //     const prioritySourceA = priorityImgA ? priorityImgA.getAttribute('src') : '';
  //     const prioritySourceB = priorityImgB ? priorityImgB.getAttribute('src') : '';

  //     // Get the taskPriority from taskData property and convert it to a numeric value
  //     const priorityValueA = getPriorityValue(prioritySourceA);
  //     const priorityValueB = getPriorityValue(prioritySourceB);

  //     console.log(priorityValueA);
  //     console.log(priorityValueB);

  //     // Compare the priority values
  //     return priorityValueA - priorityValueB;
  //   });
  // }
  // console.log(taskDivArray);

//   // Delete all current elements of class 'taskContainerDiv'
//   const taskContainerDivs = document.querySelectorAll('.taskContainerDiv');
//   taskContainerDivs.forEach((taskContainerDiv) => {
//       taskContainerDiv.parentNode.removeChild(taskContainerDiv);
//   });

//   const tasksContainer = document.querySelector('.tasksContainer');

//   // Iterate through the sorted taskDivArray and create new taskContainerDivs
//   taskDivArray.forEach((task, index) => {
//     const taskContainerDiv = document.createElement('div');
//     taskContainerDiv.classList.add('taskContainerDiv');

//     const taskBigDiv = document.createElement('div');
//             taskBigDiv.classList.add('taskBigDiv');
//             const taskDiv = document.createElement('div');
//             taskDiv.classList.add('taskDiv');
//             taskDiv.id = (index + 1).toString();
//             taskDiv.dataset.taskId = taskDiv.id;
    
//             taskDiv.addEventListener('click', function() {
//                 openTaskModalForEditing(newTask);
//             });
//             const taskPrim = document.createElement('div');
//                 taskPrim.classList.add('taskPrim');
//             taskDiv.appendChild(taskPrim);
//                 const checkbox = document.createElement('input');
//                     checkbox.type = 'checkbox';
//                     checkbox.addEventListener('click', function(event) {
//                     event.stopPropagation();
//                     if (this.checked) {
//                     taskTitle.classList.add('complete');
//                     taskCategory.classList.add('complete');
//                     taskDueDate.classList.add('complete');
//                     taskPriority.classList.add('complete');
//                     } else {
//                         taskTitle.classList.remove('complete');
//                         taskCategory.classList.remove('complete');
//                     taskDueDate.classList.remove('complete');
//                     taskPriority.classList.remove('complete');
//                     }
//                     });
    
//                 const taskTitle = document.createElement('div');
//                     taskTitle.classList.add('taskTitle');
//                     taskTitle.textContent = task.taskTitle;
//                 const taskCategory = document.createElement('div');
//                     taskCategory.classList.add('taskCategory');
//                     taskCategory.textContent = "(" + task.category + ")";
    
//                 taskPrim.appendChild(checkbox);taskPrim.appendChild(taskTitle);taskPrim.appendChild(taskCategory);
    
//             const taskSec = document.createElement('div');
//                 taskSec.classList.add('taskSec');
//             taskDiv.appendChild(taskSec);
    
//                 const taskDueDate = document.createElement('div');
//                     taskDueDate.classList.add('taskDueDate');
//                     taskDueDate.textContent = task.taskDueDate
//                 const taskPriority = document.createElement('div');
//                     taskPriority.classList.add('taskPriority');
//                 const taskPriorityImg = document.createElement('img');

//                 // Get the taskPriority img elements from the taskDiv elements
//                 const priorityImg = task.querySelector('.taskPriority img');

//                 // Extract the src attribute value from the img elements
//                 const prioritySource = priorityImg ? priorityImg.getAttribute('src') : '';

//                 // Get the taskPriority from taskData property and convert it to a numeric value
//                 const priorityValue = getPriorityValue(prioritySource);
                
//                 if(priorityValue == 3){taskPriorityImg.src = "./images/warning-333.png"}
//                 else if(priorityValue == 2){taskPriorityImg.src = "./images/warning-222.png"}
//                 else if(priorityValue == 1){taskPriorityImg.src = "./images/warning-111.png"}
//                 else {taskPriorityImg.src = "./images/warning_grey.png"}
//                     taskPriorityImg.classList.add('symbol');
//                     taskPriority.appendChild(taskPriorityImg);
//                 const deleteBtnBigDiv = document.createElement('img');
//                     deleteBtnBigDiv.id = taskDiv.id;
//                     deleteBtnBigDiv.src = "./images/delete.png"; // Change to your delete image's path
//                     deleteBtnBigDiv.classList.add('symbol');
    
//                 deleteBtnBigDiv.addEventListener('click', function(event) {
//                     event.stopPropagation();
//                     // Get taskId from the editingTaskId data attribute
//                     let taskId = deleteBtnBigDiv.id;
//                     if (!taskId) {
//                         console.log('No task is currently being edited');
//                         return;
//                     } deleteTask(taskDiv.id);
//                 });
    
//                 taskSec.appendChild(taskDueDate); taskSec.appendChild(taskPriority);
//                 taskBigDiv.appendChild(taskDiv);taskBigDiv.appendChild(deleteBtnBigDiv);
    
//             const linebreak = document.createElement('hr');
    
//             taskContainerDiv.appendChild(taskBigDiv);
//             taskContainerDiv.appendChild(linebreak);
//             tasksContainer.appendChild(taskContainerDiv);    
// });

//   // Helper functions
//   function getTaskData(taskDiv){
//     // Get the taskDueDate and taskPriority elements within the taskDiv
//     const taskTitle = taskDiv.querySelector('.taskTitle').innerHTML;
//     const taskCategory = taskDiv.querySelector('.taskCategory').innerHTML;
//     const taskDueDate = taskDiv.querySelector('.taskDueDate').innerHTML;
//     const taskPriority = taskDiv.querySelector('.taskPriority').innerHTML;
  
//     // Add taskData as a property of the taskDiv element
//     taskDiv.taskData = {
//       taskTitle,
//       taskCategory,
//       taskDueDate,
//       taskPriority,
//     };
//   }
//   function getPriorityValue(taskPrioritySrc){
//     switch (taskPrioritySrc) {
//       case "./images/warning-333.png":
//           return 3;
//       case "./images/warning-222.png":
//           return 2;
//       case "./images/warning-111.png":
//           return 1;
//       case "./images/warning_grey.png":
//           return 0;
//       default:
//           return -1; // Default value for undefined or other sources
//     }
//   }

// }
let sortByDateOrder = 'oldestFirst';
let sortByPriorityOrder = 'highestFirst'; 

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
    if (sortByDateOrder === 'oldestFirst') {
      dataToSort.sort((a, b) => {
          return new Date(a.taskDueDate) - new Date(b.taskDueDate);
      });
      sortByDateOrder = 'newestFirst'; // Toggle to newest date first
    } else if (sortByDateOrder === 'newestFirst') {
        // Sort by newest date first
        dataToSort.sort((a, b) => {
            return new Date(b.taskDueDate) - new Date(a.taskDueDate);
        });
        sortByDateOrder = 'oldestFirst'; // Toggle to oldest date first
    }
    console.log(sortByDateOrder);
  }

  function sortByPriority(){
    if(sortByPriorityOrder ==='highestFirst'){
      dataToSort.sort((a, b) => {
        // Get the taskPriority from taskData property and convert it to a numeric value for comparison
        const priorityValueA = getPriorityValue(a.taskPriorityFilename);
        const priorityValueB = getPriorityValue(b.taskPriorityFilename);
  
        return priorityValueB - priorityValueA;
      });
      sortByPriorityOrder = 'lowestFirst'; // Toggle to lowest priorirty
    } else if(sortByPriorityOrder ==='lowestFirst'){
      dataToSort.sort((a, b) => {
        // Get the taskPriority from taskData property and convert it to a numeric value for comparison
        const priorityValueA = getPriorityValue(a.taskPriorityFilename);
        const priorityValueB = getPriorityValue(b.taskPriorityFilename);
  
        return priorityValueA - priorityValueB;
      });
      sortByPriorityOrder = 'highestFirst'; // Toggle to lowest priorirty
    }
    console.log(sortByPriorityOrder);

    //Helper function
    function getPriorityValue(taskPrioritySrc){
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


