import { initDomCache, getCache } from "./dom-cache.js";
import { format, differenceInCalendarDays } from "date-fns";
import { getProjects, createProject, createTask, editTask, taskCompleted, addChecklistSubtask } from "./todo-logic.js";
import Task from "./task.js";


initDomCache();
const {sidebarProjects, sidebarTasks, header, mainContainer, projectsList, projectCards, newProjectButton, newProjectTitle, newProjectSubmit, dueToday, home, dialog, expandedTask, taskCards, taskTitle, taskProject, taskDueDate, taskDescription, taskPriority, taskNotes, taskChecklist, taskStatus, sidebarTasksList, sidebarTasksHeader, todaysTasks, newTaskButton, taskSubmit, taskEdit, addSubtask, completeButtons, subtaskDialog, newSubtaskTitle, subtaskSubmit } = getCache();
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
        sidebarTasksHeader.style.visibility = "visible"
        projects.forEach(project => {
            if (project.title == currentProject) {
                project.tasks.forEach(task => {
                    const renderedTask = document.createElement("button");
                    renderedTask.id = task.title;
                    renderedTask.classList.add(project.title.replace(/ /g, "-"));
                    renderedTask.textContent = task.title + ` (Due ${getDueDateText(task.dueDate)})`;
                    renderedTask.classList.add("task");
                    sidebarTasks.append(renderedTask);
                })
            }
        });
        eventListeners.expandTaskCard([...sidebarTasksList]);
    } else sidebarTasksHeader.style.visibility = "hidden";
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
                taskDueToday.classList.add("today", (project.title.replace(/ /g, "-")));
                taskDueToday.id = task.title
                dueToday.append(taskDueToday);
                //Add more content to task list
            }

        })
    });
    eventListeners.expandTaskCard([...todaysTasks]);
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
    eventListeners.projectButtons([...projectCards]);
    newTaskButton.style.display = "none";
}

const renderProjectPage = function(projects, currentProject) {
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild);
    }
    projects.forEach(project => {
        if (project.title == currentProject) {
            project.tasks.forEach(task => {
                if (task.status == "Incomplete") {
                    const taskCard = document.createElement("div");
                    taskCard.id = task.title;
                    taskCard.classList.add(project.title.replace(/ /g, "-"));
                    const taskTitle = document.createElement("div");
                    const taskDueDate = document.createElement("div");
                    const completeTask = document.createElement("button");
                    completeTask.classList.add("complete-task");
                    completeTask.id = task.title;
                    completeTask.textContent = "Complete Task";
                    taskTitle.textContent = task.title;
                    taskDueDate.textContent = "Due: " + getDueDateText(task.dueDate);
                    taskCard.append(taskTitle, taskDueDate, completeTask);
                    taskCard.classList.add("task-card");
                    mainContainer.append(taskCard);
                    mainContainer.classList.remove("project-page", "home-page");
                    mainContainer.classList.add("project-page");
                    //IF DUE DATE PASSED HIGHLIGHT RED
                };
            });
            newTaskButton.style.display = "block";
            eventListeners.newTask();
            eventListeners.completeTask();
        };
    });
    eventListeners.expandTaskCard([...taskCards]);

}

const getDueDateText = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    today.setHours(12, 0, 0, 0);
    due.setHours(12, 0, 0, 0);
    const diff = differenceInCalendarDays(due, today);

    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    if (diff === -1) return "Yesterday";
    if (diff < 0) return `${Math.abs(diff)} day ago`;

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

    const newTask = function() {
        newTaskButton.addEventListener("click", () => {
            const project = header.textContent.slice(1);
            populateTaskCard(project, "", new Date(), "", null, "", [], "Incomplete");
            expandedTaskEditable(true);
            expandedTask.showModal();
        });
        taskSubmit.addEventListener("click", () => {
            const projects = getProjects();
            const currentProj = projects.find(project => project.title == header.textContent.slice(1));
            console.log(currentProj);
            if (currentProj.tasks.some(task => task.title == taskTitle.value)) {
                editTask(header.textContent.slice(1), taskTitle.value, taskDueDate.value, taskDescription.value, taskPriority.value, taskNotes.value);
            } else {
                createTask(currentProj.title, taskTitle.value, taskDueDate.value, taskDescription.value, taskPriority.value, taskNotes.value);
            };
        })
    }

    const newSubtask = function() {
        addSubtask.addEventListener("click", (e) => {
            e.preventDefault();
            subtaskDialog.showModal();
            subtaskSubmit.addEventListener("click", (e) => {
                e.preventDefault();
                const project = header.textContent.slice(1);
                const task = taskTitle.value;
                const subtask = newSubtaskTitle.value;
                addChecklistSubtask(subtask, project, task);
                subtaskDialog.close();
            })
        })
    }

    const expandedTaskReadOnly = function() {
        taskTitle.readOnly = true;
        taskDueDate.readOnly = true;
        taskDescription.readOnly = true;
        taskPriority.disabled = true;
        taskNotes.disabled = true;
        taskSubmit.style.display = "none";
        taskEdit.style.display = "block";
    }

    const expandedTaskEditable = function(check) {
        taskDueDate.readOnly = false;
        taskDescription.readOnly = false;
        taskPriority.disabled = false;
        taskNotes.disabled = false;
        taskSubmit.style.display = "block";
        taskEdit.style.display = "none";
        if (check === true) {
            taskTitle.readOnly = false;
        } else taskTitle.readOnly = true;
    }
    
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

    const expandTaskCard = function(collection) {
        collection.forEach(card => {
            card.addEventListener("click", (e) => {
                const taskID = e.target.id;
                getProjects().forEach(project => {
                    if (e.target.classList.contains(project.title.replace(/ /g, "-"))) {
                        project.tasks.forEach(task => {
                            if (task.title == taskID) {
                                populateTaskCard(project.title, task.title, task.dueDate, task.description, task.priority, task.notes, task.checklist, task.status);
                                expandedTaskReadOnly();
                                expandedTask.showModal();
                                newSubtask();
                                taskEdit.addEventListener("click", (e) => {
                                    e.preventDefault();
                                    expandedTaskEditable(false);
                                })
                            }
                        })
                    }
                })
            })
        })
    }

    const completeTask = function() {
        [...completeButtons].forEach(button => {
            button.addEventListener("click", (e) => {
                taskCompleted(header.textContent.slice(1), e.target.id);
            })
        })
    }
    
    return { newProject, homeButton, projectButtons, expandTaskCard, newTask, expandedTaskEditable, expandedTaskReadOnly, completeTask, newSubtask };
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