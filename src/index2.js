
document.addEventListener('DOMContentLoaded', function() {
    // All our application logic will reside here

    // Initialize all our classes and methods here
    const taskManager = new TaskManager();
    const categoryManager = new CategoryManager();
    const ui = new UI();

    // Add sample task and categories
    taskManager.addTask(new Task(1, "Sample Task", "This is a sample task description", "2023-08-18", categoryManager.getCategoryById(1)));
    categoryManager.addCategory("Sample Category");

    // Setup event listeners and other initializations
    ui.setupUI();

});


class Task {
    constructor(id, title, description, dueDate, category) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.category = category;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    getTaskById(id) {
        return this.tasks.find(task => task.id === id);
    }

    editTask(id, newDetails) {
        const task = this.getTaskById(id);
        if (!task) return;

        // Assuming newDetails is an object with properties to overwrite
        // E.g., newDetails might look like: { title: 'New Title', dueDate: '2023-08-18' }
        for (let key in newDetails) {
            if (task.hasOwnProperty(key)) {
                task[key] = newDetails[key];
            }
        }
    }

    deleteTask(id) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }

    filterTasksByDate(startDate, endDate) {
        return this.tasks.filter(task => {
            const taskDate = new Date(task.dueDate);
            return taskDate >= startDate && taskDate <= endDate;
        });
    }

    filterTasksByCategory(categoryName) {
        return this.tasks.filter(task => task.category.name === categoryName);
    }

    // Add any additional methods you might need in the future
}

class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class CategoryManager {
    constructor() {
        this.categories = [];
        this.nextId = 1; // This can be used to generate unique IDs for categories
    }
    addCategory(name) {
        const category = {
            id: this.nextId,
            name: name
        };
        this.categories.push(category);
        this.nextId++;
    }
    getCategoryById(id) {
        return this.categories.find(cat => cat.id === id);
    }
    getCategoryByName(name) {
        return this.categories.find(cat => cat.name === name);
    }
    editCategory(id, newName) {
        const category = this.getCategoryById(id);
        if (category) {
            category.name = newName;
        } else {
            console.error(`Category with ID ${id} not found.`);
        }
    }
    deleteCategory(id) {
        const index = this.categories.findIndex(cat => cat.id === id);
        if (index !== -1) {
            this.categories.splice(index, 1);
        } else {
            console.error(`Category with ID ${id} not found.`);
        }
    }
}

class UI {
    constructor(taskManager, categoryManager) {
        this.taskManager = taskManager;
        this.categoryManager = categoryManager;
        this.initDOMReferences();
    }
    initDOMReferences() {
        // DOM references
        this.allBtn = document.getElementById('allBtn');
        this.todayBtn = document.getElementById('todayBtn');
        this.thisWeekBtn = document.getElementById('thisWeekBtn');
        this.thisMonthBtn = document.getElementById('thisMonthBtn');
        this.pageTimeline = document.getElementById('pageTimeline');
        this.collapseBtn = document.getElementById('collapseBtn'); // Assuming you have a button with this ID
        this.nav = document.getElementById('nav'); // Assuming you have an element with this ID
        this.content = document.getElementById('content'); // Assuming you have an element with this ID
        this.modal = document.getElementById('modal'); // Assuming you have an element with this ID
        this.catModal = document.getElementById('catModal'); // Assuming you have an element with this ID
        this.form = document.getElementById('form'); // Assuming you have a form with this ID
        this.okTaskBtn = document.getElementById('okTaskBtn'); // Assuming you have a button with this ID
        // ... add other references as needed
    }
    setupUI() {
        this.initializePageFilters();
        this.setFilterBtnListeners();
        this.setNavigationCollapseExpand();
        this.setModalListeners();
        this.setFormSubmitListener();

         // Now, display the tasks and categories
         this.displayAllTasks();
         this.displayAllCategories();
    }
    displayAllTasks() {
        // Logic to display tasks. This might involve iterating over `this.taskManager.tasks` and adding them to the DOM.
    }

    displayAllCategories() {
        // Logic to display categories. Iterate over `this.categoryManager.categories` and add them to the DOM.
    }
    initializePageFilters() {
        let currentCategory = document.getElementById('inboxBtn');
        currentCategory.classList.add('selectedFilter');
        this.filterPageChanges(currentCategory);
        let currentTimeline = document.getElementById('allBtn');
        currentTimeline.classList.add('selectedFilter');
    }
    setFilterBtnListeners() {
        this.todayBtn.addEventListener('click', () => {
            const today = this.getCurrentDate();
            this.taskManager.selectedEndDate = today;
            this.taskManager.filterTasksByDateAndCategory(today, this.categoryManager.selectedCategory);
            this.removeFilterClasses();
            this.todayBtn.classList.add('selectedFilter');
            this.pageTimeline.textContent = this.todayBtn.textContent;
        });  
        this.thisWeekBtn.addEventListener('click', () => {
            const today = this.getCurrentDate();
            const oneWeekLater = new Date();
            oneWeekLater.setDate(today.getDate() + 7);
            this.taskManager.selectedEndDate = oneWeekLater;
            this.taskManager.filterTasksByDateAndCategory(oneWeekLater, this.categoryManager.selectedCategory);
            this.removeFilterClasses();
            this.thisWeekBtn.classList.add('selectedFilter');
            this.pageTimeline.textContent = this.thisWeekBtn.textContent;
        });    
        this.thisMonthBtn.addEventListener('click', () => {
            const today = this.getCurrentDate();
            const oneMonthLater = new Date();
            oneMonthLater.setDate(today.getDate() + 30);
            this.taskManager.selectedEndDate = oneMonthLater;
            this.taskManager.filterTasksByDateAndCategory(oneMonthLater, this.categoryManager.selectedCategory);
            this.removeFilterClasses();
            this.thisMonthBtn.classList.add('selectedFilter');
            this.pageTimeline.textContent = this.thisMonthBtn.textContent;
        });
        this.allBtn.addEventListener('click', () => {
            this.taskManager.selectedEndDate = null;
            this.taskManager.filterTasksByDateAndCategory(null, this.categoryManager.selectedCategory);
            this.removeFilterClasses();
            this.allBtn.classList.add('selectedFilter');
            this.pageTimeline.textContent = this.allBtn.textContent;
        });
    }
    setNavigationCollapseExpand() {
        this.collapseBtn.addEventListener('click', () => {
            // ... your logic for collapse/expand
        });
    }
    setModalListeners() {
        const span = this.modal.querySelector('span'); // This assumes there's a span inside the modal for closing it
        const spanCatModal = this.catModal.querySelector('span'); // Similarly, for the catModal
    
        span.onclick = () => {
            this.modal.style.display = "none";
        };
        spanCatModal.onclick = () => {
            this.catModal.style.display = "none";
        };
        window.onclick = (event) => {
            if (event.target == this.modal) {
                this.modal.style.display = "none";
            } else if(event.target == this.catModal) {
                this.catModal.style.display = "none";
            }
        };
    }
    setFormSubmitListener() {
        this.form.addEventListener('keydown', event => {
            if (event.key === "Enter") {
                event.preventDefault(); 
                this.okTaskBtn.click(); 
            }
        });
    }
    filterPageChanges(currentCategory) {
        let computedStyle = window.getComputedStyle(currentCategory);
        let bgColor = computedStyle.backgroundColor;
        let fontColor = computedStyle.color;
        this.pageTitle.style.backgroundColor = bgColor; // Assuming pageTitle is also a DOM reference you missed mentioning.
        this.pageTitle.style.color = fontColor;
    }
}

