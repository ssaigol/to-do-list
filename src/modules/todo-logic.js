import {  } from "date-fns/locale";
import Project from "./project.js";
import Task from "./task.js";

const projects = [];
projects.push(new Project("Misc"));
populateStorage();

//Manipulate the actual projects array
function createProject(title) {
    projects.push(new Project(title));
    populateStorage();
};

function createTask(projectID, title, dueDate, description, priority, notes) {
    const project = projects.find(project => project.id === projectID);
    const projectTitle = project.title;
    if (!project) return;
    const newTask = new Task(title, projectTitle, projectID, dueDate, description, priority, notes);
    project.addTask(newTask);
    populateStorage();
}

function changeProjectTitle(projectID, newTitle) {
    projects.find(project => project.id === projectID).title = newTitle;
    populateStorage();
}

const editTask = (function() {


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
        findTask(taskID)?.changeStatus();
        populateStorage();
    };

    function addTaskSubtask(taskID, subtask) {
        const task = findTask(taskID);
        if (task) {
            task.addSubtask(subtask);
            populateStorage();
        }

    };

    function changeTaskSubtaskStatus(taskID, subtask) {
        findTask(taskID)?.changeSubtaskStatus(subtask);
        populateStorage();
    };

    
    return { edit, changeTaskStatus, addTaskSubtask, changeTaskSubtaskStatus }
})();

function findTask(taskID) {
    projects.forEach(project => {
        project.tasks.forEach(task => {
            if (task.id === taskID) {
                return task;
            }
        })
    })

    // const project = projects.find(project => project.id === projectID);
    // return project ? project.getTask(taskID) : null;
};

//Retrieve stored projects array for dom manipulation
function getProjects() {
    const projectsArr = getStoredProjects();
    return projectsArr;
}

function getProjectTitle(projectID) {
    const projects = getStoredProjects();
    const project = projects.find(project => project.id === projectID);
    return project ? project.title : "Unknown Project";
}

function getTasks(projectID) {
    const projects = getStoredProjects();
    const projectTasks = projects.find(project => project.id === projectID);
    return projectTasks ? projectTasks.tasks : [];
}

function getTaskInfo(taskID) {
    const task = getAllTasks().find(task => task.id === taskID);
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
}

function getAllTasks() {
    const projects = getStoredProjects();
    const tasks = [];
    if (projects) {
        projects.forEach(project => {
            (project.tasks || []).forEach(task => {
                tasks.push(task);
            });
    });
    return tasks;
    };
}



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

export { createProject, createTask, changeProjectTitle, editTask, getProjects, getProjectTitle, getTasks, getTaskInfo, getAllTasks };


//Write delete task function (using Project class delete class method)
//Write delete project function (iterate through projects array) ==> add warning that will delete all tasks within