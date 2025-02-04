export default class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    deleteTask(taskTitle) {
        this.tasks = this.tasks.filter(task => task.title !== taskTitle);
    }
}