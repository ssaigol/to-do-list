let cache = {};

export function initDomCache() {
    cache.header = document.getElementById("current-project"); //MIGHT NOT NEED CHECK LATER

    cache.sidebar = document.getElementById("sidebar"); //MIGHT NOT NEED CHECK LATER
    cache.sidebarProjects = document.getElementById("projects-list");
    cache.sidebarTasks = document.getElementById("tasks-list");
    cache.newProjectButton = document.getElementById("new-project-button");
    cache.dialog = document.getElementById("dialog");
    cache.newProjectTitle = document.getElementById("new-project-title");
    cache.newProjectSubmit = document.getElementById("submit");

    cache.mainContainer = document.getElementById("main"); //MIGHT NOT NEED CHECK LATER


    cache.dueToday = document.getElementById("todays-tasks");
};

export function getCache() {
    return cache;
};