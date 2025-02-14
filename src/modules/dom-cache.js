let cache = {};

function initDomCache() {
    //Header elements
    cache.header = document.getElementById("current-project"); 
    cache.homeButton = document.getElementById("home");
    cache.menuButton = document.getElementById("menu-button");

    //Sidebar elements
    cache.sidebar = document.getElementById("sidebar");
    cache.sidebarProjectsList = document.getElementById("projects-list");
    cache.sidebarTasksList = document.getElementById("tasks-list");
    cache.sidebarTasksHeader = document.getElementById("tasks-header");
    cache.newProjectButton = document.getElementById("new-project-button");
    cache.newTaskButton = document.getElementById("new-task-button");
    cache.sidebarProjects = document.getElementsByClassName("project"); //HTML Collection
    cache.sidebarTasks = document.getElementsByClassName("task");   //HTML Collection

    //Today's Tasks elements
    cache.todaysTasksList = document.getElementById("todays-tasks");
    cache.todaysTasks = document.getElementsByClassName("today"); //HTML Collection 
    cache.todaysTasksDescriptions = document.getElementsByClassName("description"); //HTML Collection

    //Main container elements
    cache.mainContainer = document.getElementById("main"); 
    cache.projectCards = document.getElementsByClassName("project-card"); //HTML Collection
    cache.changeNameButtons = document.getElementsByClassName("change-project-name"); //HTML Collection
    cache.taskCards = document.getElementsByClassName("task-card"); //HTML Collection

    //New Project dialog
    cache.newProjectDialog = document.getElementById("new-project-dialog");
    cache.newProjectTitle = document.getElementById("project-title");
    cache.newProjectSubmitButton = document.getElementById("submit");

    //Rename Project dialog
    cache.renameProjectDialog = document.getElementById("change-project-name-dialog");
    cache.renameProjectTitle = document.getElementById("new-project-title");
    cache.renameProjectSubmitButton = document.getElementById("new-project-title-submit");

    //Expanded task card dialog
    cache.expandedTaskCard = document.getElementById("expanded-task");
    cache.taskProject = document.getElementById("task-project");
    cache.taskTitle = document.getElementById("task-title");
    cache.taskDueDate = document.getElementById("task-due-date");
    cache.taskDescription = document.getElementById("task-description");
    cache.taskPriority = document.getElementById("task-priority");
    cache.taskNotes = document.getElementById("task-notes");
    cache.taskChecklist = document.getElementById("task-checklist");
    cache.taskStatus = document.getElementById("task-status");
    cache.taskSubmitButton = document.getElementById("task-submit"); 
    cache.taskEditButton = document.getElementById("task-edit");
    cache.addSubtaskButton = document.getElementById("task-subtask");
    cache.closeExpandedTaskCard = document.getElementById("close");

    //New Subtask dialog
    cache.subtaskDialog = document.getElementById("subtask");
    cache.subtaskTitle = document.getElementById("new-subtask");
    cache.subtaskSubmitButton = document.getElementById("submit-subtask");

    //Task complete button
    cache.completeTaskButtons = document.getElementsByClassName("complete-task"); //HTML Collectiom
};

function getCache() {
    return cache;
};

export { initDomCache, getCache }
