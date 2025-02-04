export default class Task {
    constructor(title, dueDate) {
        this.title = title;
        this.dueDate = dueDate;
        this.description = "";
        this.priority = 0;
        this.notes = "";
        this.checklist = [];
        this.status = "Incomplete";
    }

    addDescription(description) {
        this.description = description;
    }

    addPriority(priority) {
        this.priority = priority;
    }

    addNotes(notes) {
        this.notes = notes;
    }

    addSubtask(subtask) {
        this.checklist.push(subtask);
    }

    taskComplete() {
        this.status = "Completed"
    }
}