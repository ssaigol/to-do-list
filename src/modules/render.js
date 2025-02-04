import { initDomCache, getCache } from "./dom-cache.js";

initDomCache();
const {sidebarProjects, sidebarTasks, header, mainContainer } = getCache();

const renderSidebar = function(projects) {
    //Clear sidebar projects before rendering
    while (sidebarProjects.firstChild) {
        sidebarProjects.removeChild(sidebarProjects.firstChild);
    };
    //Iterate through projects and render as list
    projects.forEach(project => {
        const renderedProject = document.createElement("li");
        renderedProject.textContent = project.title;
        sidebarProjects.append(renderedProject);
    });
    //render tasks list only for selected project (empty when home selected)
};


const renderHeader = function(currentProject) {
    if (currentProject != "Home") {
        header.textContent = `Home/${currentProject}`;
    } else header.textContent = "Home";
};

const renderTasksDueToday = function(today) {
    const { dueToday } = getCache();
    projects.forEach(project => {
        project.tasks.forEach(task => {
            if (task.dueDate == today) {
                const taskDueToday = document.createElement("div");
                taskDueToday.textContent = task.title;
                dueToday.append(taskDueToday);
                //Add more content to task list
            }

        })
    })
};

const renderHomePage = function(projects) {
    projects.forEach(project => {
        const projectCard = document.createElement("div");
        projectCard.textContent = project.title;
        projectCard.classList.add("project-card");
        mainContainer.append(projectCard);
        mainContainer.classList.remove("project-page", "home-page");
        mainContainer.classList.add("home-page");
    })
}

const renderProjectPage = function(projects, currentProject) {
    projects.forEach(project => {
        if (project.title == currentProject) {
            project.tasks.forEach(task => {
                const taskCard = document.createElement("div");
                const taskTitle = document.createElement("div");
                const taskDueDate = document.createElement("div");
                taskTitle.textContent = task.title;
                taskDueDate.textContent = task.dueDate;
                taskCard.append(taskTitle, taskDueDate);
                taskCard.classList.add("task-card");
                mainContainer.append(taskCard);
                mainContainer.classList.remove("project-page", "home-page");
                mainContainer.classList.add("project-page");
            });
        };
    })
}


const renderMain = function(currentProject) {
    if (currentProject == "Home") {
        renderHomePage();
    } else renderProjectPage(currentProject)
}



export { renderSidebar, renderHeader, renderTasksDueToday, renderHomePage, renderProjectPage }