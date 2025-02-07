let cache = {};

function initDomCache() {
    cache.header = document.getElementById("current-project"); 
    cache.home = document.getElementById("home");
    cache.sidebarProjects = document.getElementById("projects-list");
    cache.sidebarTasks = document.getElementById("tasks-list");
    cache.newProjectButton = document.getElementById("new-project-button");
    cache.newTaskButton = document.getElementById("new-task-button");
    cache.dialog = document.getElementById("dialog");
    cache.newProjectTitle = document.getElementById("new-project-title");
    cache.newProjectSubmit = document.getElementById("submit");
    cache.projectsList = document.getElementsByClassName("project");
    cache.projectCards = document.getElementsByClassName("project-card");
    cache.mainContainer = document.getElementById("main"); 
    cache.dueToday = document.getElementById("todays-tasks");
    cache.sidebarTasksHeader = document.getElementById("tasks-header");
    cache.todaysTasks = document.getElementsByClassName("today");
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
    cache.sidebarTasksList = document.getElementsByClassName("task");
    cache.taskSubmit = document.getElementById("task-submit"); 
    cache.taskEdit = document.getElementById("task-edit");
    cache.addSubtask = document.getElementById("task-subtask");
    cache.subtaskDialog = document.getElementById("subtask");
    cache.newSubtaskTitle = document.getElementById("new-subtask");
    cache.subtaskSubmit = document.getElementById("submit-subtask");
    cache.completeButtons = document.getElementsByClassName("complete-task");
};

function getCache() {
    return cache;
};

export { initDomCache, getCache }
