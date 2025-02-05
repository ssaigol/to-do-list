let cache = {};

function initDomCache() {
    cache.header = document.getElementById("current-project"); //MIGHT NOT NEED CHECK LATER
    cache.home = document.getElementById("home");

    cache.sidebar = document.getElementById("sidebar"); //MIGHT NOT NEED CHECK LATER
    cache.sidebarProjects = document.getElementById("projects-list");
    cache.sidebarTasks = document.getElementById("tasks-list");
    cache.newProjectButton = document.getElementById("new-project-button");
    cache.dialog = document.getElementById("dialog");
    cache.newProjectTitle = document.getElementById("new-project-title");
    cache.newProjectSubmit = document.getElementById("submit");
    cache.projectsList = document.getElementsByClassName("project");
    cache.projectCards = document.getElementsByClassName("project-card");

    cache.mainContainer = document.getElementById("main"); //MIGHT NOT NEED CHECK LATER


    cache.dueToday = document.getElementById("todays-tasks");
};

function getCache() {
    return cache;
};

export { initDomCache, getCache }
