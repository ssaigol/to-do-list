import "./assets/styles.css";
import { init } from "./modules/render";
import { getProjects } from "./modules/todo-logic";


const projects = getProjects();


init(projects, "Home");

// document.getElementById("expanded-task").showModal();