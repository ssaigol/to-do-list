// Stylesheets
import "./assets/styles.css";
import "./assets/sidebar-styles.css";
import "./assets/dialogs.css"


import { init } from "./modules/render";
import { getProjects } from "./modules/todo-logic";



const projects = getProjects();


init(projects, "Home");