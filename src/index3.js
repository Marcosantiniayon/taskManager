import {Task} from'./taskFunctions';
import {Category} from'./categoryFunctions';
import {initializeTaskEventListeners, initializeCatEventListeners, initializeDefaultFilters, initializeTimeFilterEvListeners, initializeCatFilterEvListeners, initializeDisplaySettings } from './domElements';
import {content, nav,modal,span,catModal,spanCatModal,tasksContainer,form,pageTitle,collapseBtn,createTaskBtn,okTaskBtn,cancelTaskBtn,deleteBtnModal,newCatBtn,okCatBtn,cancelCatBtn,inboxBtn,responsibilitiesBtn,eventsBtn,programmingBtn,titleInput,categorySelect,dueDateSelect,prioritySelect,descriptionInput,categoryButtons,allBtn, todayBtn, thisWeekBtn, thisMonthBtn, pageTimeline, colorPicker, colorDisplay} from './domElements';
// let taskCounter = 0;

initializeTaskEventListeners();
initializeCatEventListeners();
initializeDefaultFilters();
initializeTimeFilterEvListeners();
initializeCatFilterEvListeners();
initializeDisplaySettings();

// ---------------------------- CATEGORIES ----------------------------
