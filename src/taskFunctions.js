import { categories } from './categoryFunctions';

let taskCounter = 0;

export class Task {
    constructor(id, title, categoryObject, dueDate, priority, description) {
        this.id = id;
        this.title = title;
        this.category = categoryObject
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;
        this.complete = false; 
    }
    toggleComplete() {
        this.complete = !this.complete;
    }
}

export {taskCounter};


