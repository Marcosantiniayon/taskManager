import {categoryButtons} from './domElements';
import { taskCounter } from './taskFunctions';

export class Category {
    constructor(name, color, catId = null) {
        this.name = name;
        this.color = color;
        this.tasks = [];
        this.catId = catId || ++lastCatId;
    }
    addTaskToCat(task) {
        this.tasks.push(task);
        // Set the task's ID to match the correct counter value
        task.id = taskCounter;
        taskCounter++;
    }
    removeTaskFromCat(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
}

let lastCatId = Math.max(...Array.from(categoryButtons).map(btn => parseInt(btn.dataset.catId)));
let defaultCategories = initializeDefaultCategories();
let categories = [...defaultCategories]; 

//Checks if we are edditing or creating a new cat  
let currentMode = null;
let catID;

function initializeDefaultCategories() {
    const categoryButtons = document.querySelectorAll('.categoriesDiv button');
    let categories = Array.from(categoryButtons).map(button => {
        let catId = parseInt(button.dataset.catId); 
        if (catId > lastCatId) lastCatId = catId;
        return new Category(button.textContent.trim(), null, catId); // Passing catId to the constructor
    });

    return categories;
} 

export {categories, catID, currentMode};