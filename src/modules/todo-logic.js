// import { format } from "date-fns";
import Project from "./project.js";
import Task from "./task.js";


// Projects array is stored in memory and rehydrated from localStorage
//#region
let projects = [];
const stored = getStoredProjects();
if (stored && stored.length > 0) {
    projects = rehydrateStoredProjects(stored);
} else {
    projects.push(new Project("Miscellaneous"));
    populateStorage();
};
//#endregion

//-------------------------------------
//Manipulate the actual projects array
//-------------------------------------
//#region
function createProject(title) {
    let projectTitle = title;
    if (title.trim() == "") {
        projectTitle = "Project"
    };
    const project = new Project(projectTitle);
    projects.push(project);
    populateStorage();
    return project;
};

function createTask(projectID, title, dueDate, description, priority, notes) {
    const project = projects.find(project => project.id === projectID);
    if (!project) return;
    const projectTitle = project.title; //for display purposes
    let taskTitle = title;
    if (title.trim() == "") {
        taskTitle = "Task"
    };
    const newTask = new Task(taskTitle, projectTitle, projectID, dueDate, description, priority, notes);
    project.addTask(newTask);
    populateStorage();
};

function changeProjectTitle(projectID, newTitle) {
    const project = projects.find(project => project.id === projectID);
    if (project) {
        project.title = newTitle;
        project.tasks.forEach(task => {
            task.project = newTitle;
        });
        populateStorage();
    }
};
//#endregion

//---------------------------------
//editTask IIFE (for editing tasks)
//---------------------------------
const editTask = (function() {

    function findTask(taskID) {
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            const foundTask = project.tasks.find(task => task.id === taskID);
            if (foundTask) return foundTask;
        }
        return null;
    };

    function edit(taskID, newTitle, newDueDate, newDescription, newPriority, newNotes) {
        const taskToEdit = findTask(taskID);
        if(!taskToEdit) return;
        taskToEdit.title = newTitle;
        taskToEdit.dueDate = newDueDate;
        taskToEdit.description = newDescription;
        taskToEdit.notes = newNotes;
        taskToEdit.priority = newPriority;
        populateStorage();
    };

    function changeTaskStatus(taskID) {
        const task = findTask(taskID);
        if (task) {
            task.changeStatus();
            populateStorage();
        }
    };

    function addTaskSubtask(taskID, subtask) {
        const task = findTask(taskID);
        if (task) {
            task.addSubtask(subtask);
            populateStorage();
        };
    };

    function changeTaskSubtaskStatus(taskID, subtask) {
        const task = findTask(taskID);
        if (task) {
            task.changeSubtaskStatus(subtask);
            populateStorage();
        };
    };

    
    return { edit, changeTaskStatus, addTaskSubtask, changeTaskSubtaskStatus }
})();

//-------------------------------
//Storage and Retrieval Functions
//-------------------------------
//#region
function populateStorage() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function rehydrateStoredProjects(storedProjects) {
    return storedProjects.map(projData => {
        const projectInstance = new Project(projData._title);
        projectInstance._id = projData._id;
        projectInstance._tasks = (projData._tasks || []).map(taskData => {
            const taskInstance = new Task(taskData._title, projData._title, projData._id, taskData._dueDate, taskData._description, taskData._priority, taskData._notes);
            taskInstance._id = taskData._id;
            taskInstance._checklist = taskData._checklist;
            taskInstance.status = taskData.status;
            Object.setPrototypeOf(taskInstance, Task.prototype);
            return taskInstance
        });
        return projectInstance;
    });
}

function getStoredProjects() {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
        const parsed = JSON.parse(storedProjects);
        return rehydrateStoredProjects(parsed);
    }
    return [];
}
//#endregion

//-------------------------------
//Functions for DOM manipulation and UI logic
//-------------------------------
//#region
function getProjects() {
    const projectsArr = projects;
    return projectsArr;
};

function getProjectTitle(projectID) {
    const project = projects.find(project => project.id === projectID);
    return project ? project.title : "Unknown Project";
};

function getTasks(projectID) {
    const projectTasks = projects.find(project => project.id === projectID);
    return projectTasks ? projectTasks.tasks : [];
};

function getTaskInfo(taskID) {
    const task = getAllTasks().find(task => task.id == taskID);
    if (!task) return {};
    return { 
        project: task.project,
        title: task.title, 
        dueDate: task.dueDate, 
        description: task.description,
        priority: task.priority,
        notes: task.notes,
        checklist: task.checklist,
        status: task.status
    };
};

function getAllTasks() {
    const tasks = [];
    if (projects) {
        projects.forEach(project => {
            (project.tasks || project._tasks || []).forEach(task => {
                tasks.push(task);
            });
        });
    };
    return tasks;
};
//#endregion

export { createProject, createTask, changeProjectTitle, editTask, getProjects, getProjectTitle, getTasks, getTaskInfo, getAllTasks };

//Write delete project function (iterate through projects array) ==> add warning that will delete all tasks within