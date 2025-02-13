import { initDomCache, getCache } from "./dom-cache.js";
import { createProject, createTask, changeProjectTitle, editTask, getProjects, getProjectTitle, getTasks, getTaskInfo, getAllTasks } from "./todo-logic.js";
import { format, differenceInCalendarDays } from "date-fns";

//Global Variables
let currentProject = "Home";
let currentTask = null;
let taskOpen = false;
const TODAY = format(new Date(), "yyyy-MM-dd");
initDomCache();
const {header, homeButton, sidebarProjectsList, sidebarTasksList, sidebarTasksHeader, newProjectButton, newTaskButton, sidebarProjects, sidebarTasks, todaysTasksList, todaysTasks, mainContainer, projectCards, changeNameButtons, taskCards, newProjectDialog, newProjectTitle, newProjectSubmitButton, renameProjectDialog, renameProjectTitle, renameProjectSubmitButton, expandedTaskCard, taskProject, taskTitle, taskDueDate, taskDescription, taskPriority, taskNotes, taskChecklist, taskStatus, taskSubmitButton, taskEditButton, closeExpandedTaskCard, addSubtaskButton, subtaskDialog, subtaskTitle, subtaskSubmitButton, completeTaskButtons } = getCache();

//Helper Functions
const populateTaskCard = (project, title, dueDate, description, priority, notes, checklist, status) => {
    taskProject.value = project;
    taskTitle.value = title;
    taskDueDate.value = dueDate;
    taskDescription.value = description;
    taskPriority.value = priority;
    taskNotes.value = notes;
    while (taskChecklist.firstChild) {
        taskChecklist.removeChild(taskChecklist.firstChild);
    };
    const checklistLegend = document.createElement("legend");
    checklistLegend.textContent = "Subtasks";
    taskChecklist.append(checklistLegend);
    checklist.forEach(subtask => {
        const checklistSubtask = document.createElement("label");
        checklistSubtask.textContent = subtask.text;
        taskChecklist.append(checklistSubtask);
    });
    taskStatus.value = status;
};

const setCurrentLocation = (projectID, taskID) => {
    currentProject = projectID;
    currentTask = taskID;
}

const expandedTaskReadOnly = function() {
    taskTitle.readOnly = true;
    taskDueDate.readOnly = true;
    taskDescription.readOnly = true;
    taskPriority.disabled = true;
    taskNotes.disabled = true;
    taskSubmitButton.style.display = "none";
    taskEditButton.style.display = "block";
}

const expandedTaskEditable = function() {
    taskTitle.readOnly = false;
    taskDueDate.readOnly = false;
    taskDescription.readOnly = false;
    taskPriority.disabled = false;
    taskNotes.disabled = false;
    taskSubmitButton.style.display = "block";
    taskEditButton.style.display = "none";
}

const eventFunctions = (() => {
    function initListeners() {
        //Home button handler
        homeButton.addEventListener("click", () => {
            setCurrentLocation("Home", null);
            render();
        });
        //New project
        newProjectButton.addEventListener("click", () => {
            newProjectTitle.value = "";
            newProjectDialog.showModal();
        });
        newProjectSubmitButton.addEventListener("click", () => {
            createProject(newProjectTitle.value);
            render();
        });
        //rename project dialog subbmit
        renameProjectSubmitButton.addEventListener("click", (e) => {
            changeProjectTitle(e.target.dataset.projectID, renameProjectTitle.value);
            renameProjectDialog.close();
            render();
        });
        //New task
        newTaskButton.addEventListener("click", () => {
            taskOpen = true;
            setCurrentLocation(currentProject, null);
            render();

        });
        taskSubmitButton.addEventListener("click", () => {
            if (currentTask === null) {
                createTask(currentProject, taskTitle.value, taskDueDate.value, taskDescription.value, taskPriority.value, taskNotes.value);
            } else {
                editTask.edit(currentTask, taskTitle.value, taskDueDate.value, taskDescription.value, taskPriority.value, taskNotes.value);
            };
            setCurrentLocation(currentProject, null);
            taskOpen = false;
            render();
        });
        taskEditButton.addEventListener("click", (e) => {
            e.preventDefault();
            expandedTaskEditable();
        });
        //add subtask
        addSubtaskButton.addEventListener("click", (e) => {
            e.preventDefault();
            subtaskTitle.value = "";
            subtaskDialog.showModal();
        });
        subtaskSubmitButton.addEventListener("click", (e) => {
            editTask.addTaskSubtask(currentTask, subtaskTitle.value);
            render();
        });
    };

    const addListeners = function() {
        function sidebar() {
            [...sidebarProjects].forEach(project => {
                project.addEventListener("click", (e) => {
                    setCurrentLocation(e.target.dataset.projectID, null);
                    render();
                });
            });
            [...sidebarTasks].forEach(task => {
                task.addEventListener("click", (e) => {
                    setCurrentLocation(currentProject, e.target.dataset.taskID);
                    render();
                })
            })
        };

        function homePageCards() {
            [...projectCards].forEach(project => {
                project.addEventListener("click", (e) => {
                    setCurrentLocation(e.target.dataset.projectID, null);
                    render();
                })
            })
        };

        function projectChangeName() {
            [...changeNameButtons].forEach(button => {
                button.addEventListener("click", (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    renameProjectTitle.value = getProjectTitle(e.target.projectID);
                    renameProjectDialog.showModal();
                    renameProjectSubmitButton.dataset.projectID = e.target.dataset.projectID;
                })
            })
        };

        function projectPageCards() {
            [...taskCards].forEach(task => {
                task.addEventListener("click", (e) => {
                    setCurrentLocation(currentProject, e.target.dataset.taskID);
                    render();
                })
            })
        };

        function completeTasks() {
            [...completeTaskButtons].forEach(button => {
                button.addEventListener("click", (e) => {
                    // e.stopPropagation();
                    editTask.changeTaskStatus(e.target.dataset.taskID);
                    render(); 
                })
            })
        };

        sidebar();
        homePageCards();
        projectChangeName();
        projectPageCards();
        completeTasks();
};

return { initListeners, addListeners }

})();

const renderFunctions = (() => {
    function renderSidebar(projects) {
        //Clear before rendering
        while (sidebarProjectsList.firstChild) {
            sidebarProjectsList.removeChild(sidebarProjectsList.firstChild);
        };
        while (sidebarTasksList.firstChild) {
            sidebarTasksList.removeChild(sidebarTasksList.firstChild);
        };

        //render sidebar projects list
        projects.forEach(project => {
            const renderedProject = document.createElement("button");
            renderedProject.textContent = project.title;
            renderedProject.classList.add("project");
            renderedProject.dataset.projectID = project.id;
            sidebarProjectsList.append(renderedProject);
        });

        // render task lists if on project page
        if (currentProject !== "Home") {
            sidebarTasksHeader.style.visibility = "visible";
            newTaskButton.style.display = "block";
            getTasks(currentProject).forEach(task => {
                if (task.projectID === currentProject) {
                    const renderedTask = document.createElement("button");
                    renderedTask.dataset.taskID = task.id;
                    renderedTask.classList.add("task");
                    renderedTask.textContent = task.title + `(Due: ${task.dueDate})`;   //fix date formatting
                    sidebarTasksList.append(renderedTask);
                }; 
            });
        } else {
            sidebarTasksHeader.style.visibility = "hidden";
            newTaskButton.style.display = "none";
        };
    };

    function renderHeader() {
        if (currentProject != "Home") {
            homeButton.textContent = "Home/";
            header.textContent = getProjectTitle(currentProject);
        } else {
            homeButton.textContent = "Home";
            header.textContent = "";
        }
    };

    function renderTodaysTasks(allTasks) {
        //clear before rendering
        while (todaysTasksList.firstChild) {
            todaysTasksList.removeChild(todaysTasksList.firstChild);
        };
        //render list of tasks with due date today
        allTasks.forEach(task => {
            if (differenceInCalendarDays(task.dueDate, TODAY) === 0 && task.status == "Incomplete") {
                const taskDueTodayContainer = document.createElement("div");
                const taskDueToday = document.createElement("div");
                taskDueToday.dataset.taskID = task.id;
                taskDueToday.classList.add("task", "today");
                taskDueToday.textContent = task.title + ` (${task.project}): ${task.description}`;
                const taskCompleteButton = document.createElement("button");
                taskCompleteButton.textContent = "Complete Task";
                taskCompleteButton.classList.add("complete-task");
                taskCompleteButton.dataset.taskID = task.id;
                taskDueTodayContainer.append(taskDueToday, taskCompleteButton);
                todaysTasksList.append(taskDueTodayContainer);
                };
        });
    };

    function renderHomePage(projects) {
        projects.forEach(project => {
            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card");
            projectCard.dataset.projectID = project.id;
            const projectCardTitle = document.createElement("div");
            projectCardTitle.textContent = project.title;
            const changeProjectNameButton = document.createElement("button");
            changeProjectNameButton.classList.add("change-project-name");
            changeProjectNameButton.dataset.projectID = project.id;
            changeProjectNameButton.textContent = "Rename";
            projectCard.append(projectCardTitle, changeProjectNameButton);
            mainContainer.append(projectCard);
        });
    };

    function renderProjectPage(allTasks) {
        getTasks(currentProject).forEach(task => {
            if (task.status == "Incomplete") {
                const taskCard = document.createElement("div");
                taskCard.dataset.taskID = task.id;
                taskCard.classList.add("task-card");
                const taskCardTitle = document.createElement("div");
                taskCardTitle.textContent = task.title;
                const taskCardDueDate = document.createElement("div");
                taskCardDueDate.textContent = `Due: ${task.dueDate}`;
                const taskCardCompleteButton = document.createElement("button");
                taskCardCompleteButton.textContent = "Complete Task";
                taskCardCompleteButton.classList.add("complete-task");
                taskCardCompleteButton.dataset.taskID = task.id;
                taskCard.append(taskCardTitle, taskCardDueDate, taskCardCompleteButton);
                mainContainer.append(taskCard);
            }
        })
    };

    function renderMain(projects, allTasks) {
        while (mainContainer.firstChild) {
            mainContainer.removeChild(mainContainer.firstChild);
        };
        mainContainer.classList.remove("home-page", "project-page");

        if (currentProject === "Home") {
            mainContainer.classList.add("home-page");
            renderHomePage(projects);
        } else {
            mainContainer.classList.add("project-page");
            renderProjectPage(allTasks);
        }
    };

    function renderTaskCard() {
        if (currentTask === null) {
            populateTaskCard(getProjectTitle(currentProject), "", TODAY, "", null, "", [], "Incomplete");
            expandedTaskEditable();
        } else {
            const {project, title, dueDate, description, priority, notes, checklist, status} = getTaskInfo(currentTask);
            populateTaskCard(project, title, dueDate, description, priority, notes, checklist, status);
            expandedTaskReadOnly();

        };       
    };

    function renderAll() {
        console.log(`${currentProject}, ${currentTask}`);
        console.log(getProjects());
        const projects = getProjects();
        const allTasks = getAllTasks();
        renderSidebar(projects);
        renderHeader();
        renderTodaysTasks(allTasks);
        renderMain(projects, allTasks);
        renderTaskCard();
        if (taskOpen === true) expandedTaskCard.showModal();
        eventFunctions.addListeners();
    };

    return { renderAll };
})();



const render = () => {
    renderFunctions.renderAll();
}


export const init = function() {
    eventFunctions.initListeners();
    render();
}

// const getDueDateText = (dueDate) => {
//     const today = new Date();
//     const due = new Date(dueDate);
//     today.setHours(12, 0, 0, 0);
//     due.setHours(12, 0, 0, 0);
//     const diff = differenceInCalendarDays(due, today);

//     if (diff === 0) return "Today";
//     if (diff === 1) return "Tomorrow";
//     if (diff === -1) return "Yesterday";
//     if (diff < 0) return `${Math.abs(diff)} day ago`;

//     return `in ${diff} days`;
// }