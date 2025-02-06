import { initDomCache, getCache } from "./dom-cache.js";
import { format, differenceInCalendarDays } from "date-fns";
import { getProjects, createProject } from "./todo-logic.js";


initDomCache();
const {sidebarProjects, sidebarTasks, header, mainContainer, projectsList, projectCards, newProjectButton, newProjectTitle, newProjectSubmit, dueToday, home, dialog, expandedTask, taskCards, taskTitle, taskProject, taskDueDate, taskDescription, taskPriority, taskNotes, taskChecklist, taskStatus } = getCache();
const TODAY = new Date();

const renderSidebar = function(projects, currentProject) {
    //Clear sidebar projects before rendering
    while (sidebarProjects.firstChild) {
        sidebarProjects.removeChild(sidebarProjects.firstChild);
    };
    //Iterate through projects and render as list
    projects.forEach(project => {
        const renderedProject = document.createElement("button");
        renderedProject.textContent = project.title;
        renderedProject.classList.add("project");
        sidebarProjects.append(renderedProject);
    });
    eventListeners.projectButtons([...projectsList]);
    //render tasks list only for selected project (empty when home selected)
    while (sidebarTasks.firstChild) {
        sidebarTasks.removeChild(sidebarTasks.firstChild);
    };
    if (currentProject != "Home") {
        projects.forEach(project => {
            if (project.title == currentProject) {
                project.tasks.forEach(task => {
                    const renderedTask = document.createElement("button");
                    renderedTask.textContent = task.title + ` (Due ${getDueDateText(task.dueDate)})`;
                    renderedTask.classList.add("task");
                    sidebarTasks.append(renderedTask);
                })
            }
        })
    }
};

const renderHeader = function(currentProject) {
    if (currentProject != "Home") {
        header.textContent = `/${currentProject}`;
    } else header.textContent = "";
};

const renderTasksDueToday = function(projects, today) {
    while (dueToday.firstChild) {
        dueToday.removeChild(dueToday.firstChild);
    };
    projects.forEach(project => {
        project.tasks.forEach(task => {
            if (differenceInCalendarDays(task.dueDate, today) === 0) {
                const taskDueToday = document.createElement("div");
                taskDueToday.textContent = task.title + ` (${project.title})`;
                dueToday.append(taskDueToday);
                //Add more content to task list
            }

        })
    })
};

const renderHomePage = function(projects) {
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild);
    }
    projects.forEach(project => {
        const projectCard = document.createElement("div");
        projectCard.textContent = project.title;
        projectCard.classList.add("project-card");
        mainContainer.append(projectCard);
        mainContainer.classList.remove("project-page", "home-page");
        mainContainer.classList.add("home-page");
    });
    eventListeners.projectButtons([...projectCards])
}

const renderProjectPage = function(projects, currentProject) {
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild);
    }
    projects.forEach(project => {
        if (project.title == currentProject) {
            project.tasks.forEach(task => {
                const taskCard = document.createElement("div");
                taskCard.id = task.title;
                taskCard.classList.add(project.title.replace(/ /g, "-"));
                const taskTitle = document.createElement("div");
                const taskDueDate = document.createElement("div");
                const completeTask = document.createElement("button");
                completeTask.classList.add("complete-task");
                completeTask.textContent = "Complete Task";
                taskTitle.textContent = task.title;
                taskDueDate.textContent = "Due: " + getDueDateText(task.dueDate);
                taskCard.append(taskTitle, taskDueDate, completeTask);
                taskCard.classList.add("task-card");
                mainContainer.append(taskCard);
                mainContainer.classList.remove("project-page", "home-page");
                mainContainer.classList.add("project-page");
            });
        };
    });
    eventListeners.expandTaskCard();
}

const getDueDateText = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diff = differenceInCalendarDays(due, today);

    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    if (diff < 0) return `${Math.abs(diff)} days ago}`;

    return `in ${diff} days`;
}

const renderMain = function(projects, currentProject) {
    if (currentProject == "Home") {
        renderHomePage(projects);
    } else renderProjectPage(projects, currentProject);
    renderHeader(currentProject);
}

const populateTaskCard = function(project, title, dueDate, description, priority, notes, checklist, status) {
    taskProject.value = project;
    taskTitle.value = title;
    taskDueDate.value = format(dueDate, "yyyy-MM-dd"); 
    taskDescription.value = description;
    taskPriority.value = priority;
    taskNotes.value = notes;
    checklist.forEach((item) => {
        // const checklistItem = document.createElement("input");
        // checklistItem.type = "checkbox";
        // checklistItem.id = item;
        const checklistItemLabel = document.createElement("label");
        checklistItemLabel.setAttribute("for", item);
        checklistItemLabel.textContent = item;
        taskChecklist.append(checklistItemLabel);
    });
    taskStatus.value = status;
}


const eventListeners = (function() {

    const newProject = function() {
        //New Project Button => Open dialog
        newProjectButton.addEventListener("click", () => dialog.showModal());
        //New Project Submit => createProject
        newProjectSubmit.addEventListener("click", () => createProject(newProjectTitle.value));
    };
    
    const homeButton = function() {
        home.addEventListener("click", () => {
            renderMain(getProjects(), "Home");
            renderSidebar(getProjects(), "Home");
        });
    };
    
    const projectButtons = function(collection) {
        collection.forEach(project => {
            project.addEventListener("click", (e) => {
                const arr = getProjects();
                const pwd = e.target.textContent;
                renderMain(arr, pwd);
                renderSidebar(arr, pwd);
            });
        })
    };

    const expandTaskCard = function() {
        [...taskCards].forEach(card => {
            card.addEventListener("click", (e) => {
                const taskID = e.target.id;
                getProjects().forEach(project => {
                    if (e.target.classList.contains(project.title.replace(/ /g, "-"))) {
                        project.tasks.forEach(task => {
                            if (task.title == taskID) {
                                populateTaskCard(project.title, task.title, task.dueDate, task.description, task.priority, task.notes, task.checklist, task.status);
                                expandedTask.showModal();
                            }
                        })
                    }
                })
            })
        })
    }
    
    return { newProject, homeButton, projectButtons, expandTaskCard };
})();


const render = (projects, currentProject) => {
    renderSidebar(projects, currentProject);
    renderMain(projects, currentProject);
    renderTasksDueToday(projects, TODAY);
}

const init = (projects, currentProject) => {
    eventListeners.newProject();
    eventListeners.homeButton();
    render(projects, currentProject);
};

export { init, render }