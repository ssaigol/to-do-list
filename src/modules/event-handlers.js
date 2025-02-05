// import { getCache } from "./dom-cache.js";
// import { createProject, createTask, getProjects } from "./todo-logic.js";
// import { renderMain } from "./render.js";



// const { newProjectButton, dialog, newProjectSubmit, newProjectTitle, projectsList, home, projectCards } = getCache();

// const newProject = function() {
//     //New Project Button => Open dialog
//     newProjectButton.addEventListener("click", () => dialog.showModal());
//     //New Project Submit => createProject
//     newProjectSubmit.addEventListener("click", () => createProject(newProjectTitle.value));
// };

// const homeButton = function() {
//     home.addEventListener("click", () => {
//         renderMain(getProjects(), "Home");
//         addProjectEventListeners([...projectCards]);
//     });
// };

// const projectButtons = function(collection) {
//     collection.forEach(project => {
//         project.addEventListener("click", (e) => {
//             const arr = getProjects();
//             const pwd = e.target.textContent;
//             renderMain(arr, pwd);
//         });
//     })
// };

// const initEventListeners = () => {
//     newProject();
//     homeButton();
// };



// export { initEventListeners, projectButtons };

