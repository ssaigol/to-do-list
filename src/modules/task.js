import { v4 as uuidv4 } from "uuid";

export default class Task {
    constructor(title, project, projectID, dueDate, description = "", priority = "", notes = "") {
        this._id = uuidv4();
        this._project = project;
        this._projectID = projectID;
        this._title = title;
        this._dueDate = dueDate;
        this._description = description;
        this._priority = priority;
        this._notes = notes;
        this._checklist = [];
        this.status = "Incomplete"
    }

    get id() {
        return this._id;
    }

    get project() {
        return this._project;
    }

    get projectID() {
        return this._projectID;
    }

    get checklist() {
        return this._checklist;
    }

    get title() {
        return this._title;
    }

    set title(taskTitle) {
        this._title = taskTitle;
    }
 
    get dueDate() {
        return this._dueDate;
    }

    set dueDate(date) {
        this._dueDate = date;
    }

    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }

    get priority() {
        return this._priority
    }

    set priority(priority) {
        if (priority == 1 || priority == 2 || priority == 3) {
            this._priority = priority;
        }
    }

    get notes() {
        return this._notes;
    }

    set notes(notes) {
        this._notes = notes;
    }

    changeStatus() {
        this.status = this.status === "Incomplete" ? "Completed" : "Incomplete";
    }

    changeSubtaskStatus(subtask) {
        const subtaskToChange = this._checklist.find(a => a.text == subtask);
        if (subtaskToChange) {
            subtaskToChange.status = subtaskToChange.status === "Incomplete" ? "Completed" : "Incomplete"
        }
    }

    addSubtask(subtask) {
        if (typeof subtask === "string" && subtask.trim() !== "") {
            this._checklist.push({ text: subtask, status: "Incomplete"});
        }

    }
}


 //get & set duedate w/ proper formatting
        //set will receive a string from input type date ("yyyy-mm-dd") & convert to a date object, disregarding time & time zones
        //get will receive a date Object and convert it to a readable string for displaying on DOM and calculating time until due
