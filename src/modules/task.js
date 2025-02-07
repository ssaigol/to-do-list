export default class Task {
    constructor(title, dueDate) {
        this.title = title;
        this.dueDate = new Date(dueDate);
        this.dueDate.setHours(12, 0, 0, 0);
        this.description = "";
        this.priority = 0;
        this.notes = "";
        this.checklist = [];
        this.status = "Incomplete";
    }
}