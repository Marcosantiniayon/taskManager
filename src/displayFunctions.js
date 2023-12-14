import { categories } from "./categoryFunctions";
import { formatDateForInput } from "./helperFunctions";
// import { currentCategory } from "./domElements";

export function filterPageChanges(categoryButton){
    let computedStyle = window.getComputedStyle(categoryButton);
    let bgColor = computedStyle.backgroundColor;
    let fontColor = computedStyle.color;
    pageTitle.style.backgroundColor = bgColor;
    pageTitle.style.color = fontColor;
}

export function removeFilters(){
    thisWeekBtn.classList.remove('selectedFilter');
    thisMonthBtn.classList.remove('selectedFilter');
    allBtn.classList.remove('selectedFilter');
    todayBtn.classList.remove('selectedFilter');
}

export function filterTasksByDateAndCategory(endDate, selectedCategory, catID) {
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

    //apply page title based on categry
    pageTitle.textContent = selectedCategory;
    pageTitle.dataset.catId = catID;
  };