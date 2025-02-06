let cache = {};

function initDomCache() {
    cache.header = document.getElementById("current-project"); 
    cache.home = document.getElementById("home");
    cache.sidebarProjects = document.getElementById("projects-list");
    cache.sidebarTasks = document.getElementById("tasks-list");
    cache.newProjectButton = document.getElementById("new-project-button");
    cache.dialog = document.getElementById("dialog");
    cache.newProjectTitle = document.getElementById("new-project-title");
    cache.newProjectSubmit = document.getElementById("submit");
    cache.projectsList = document.getElementsByClassName("project");
    cache.projectCards = document.getElementsByClassName("project-card");
    cache.mainContainer = document.getElementById("main"); 
    cache.dueToday = document.getElementById("todays-tasks");

    cache.expandedTask = document.getElementById("expanded-task");
    cache.taskCards = document.getElementsByClassName("task-card");
    cache.taskProject = document.getElementById("task-project");
    cache.taskTitle = document.getElementById("task-title");
    cache.taskDueDate = document.getElementById("task-due-date");
    cache.taskDescription = document.getElementById("task-description");
    cache.taskPriority = document.getElementById("task-priority");
    cache.taskNotes = document.getElementById("task-notes");
    cache.taskChecklist = document.getElementById("task-checklist");
    cache.taskStatus = document.getElementById("task-status");

};

function getCache() {
    return cache;
};

export { initDomCache, getCache }
