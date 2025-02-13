import { v4 as uuidv4 } from "uuid";

export default class Project {
    constructor(title) {
        this._id = uuidv4();
        this._title = title;
        this._tasks = [];
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    set title(newTitle) {
        this._title = newTitle;
    }

    get tasks() {
        return this._tasks;
    }

    getTask(taskID) {    //returns a copy of task that matches provided ID
        return this._tasks.find(task => task.id === taskID);
    }

    deleteTask(taskID) {
        this._tasks = this._tasks.filter(task => task.id !== taskID);
    }

    addTask(task) {
        this._tasks.push(task);
    }
}