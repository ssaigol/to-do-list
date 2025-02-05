import Project from "./project.js";
import Task from "./task.js";
import { render } from "./render.js";

// const projects = [];

const projects = [
    {
        title: "Work",
        tasks: [
            {
                title: "Finish report",
                dueDate: new Date(2025, 1, 5),
                description: "Description for Finish report",
                priority: 2,
                notes: "Notes for Finish report",
                checklist: ["Subtask 1 for Finish report", "Subtask 2 for Finish report"],
                status: "Incomplete"
            },
            {
                title: "Attend meeting",
                dueDate: new Date(2025, 1, 6),
                description: "Description for Attend meeting",
                priority: 1,
                notes: "Notes for Attend meeting",
                checklist: ["Subtask 1 for Attend meeting", "Subtask 2 for Attend meeting"],
                status: "Incomplete"
            },
            {
                title: "Review code",
                dueDate: new Date(2025, 1, 7),
                description: "Description for Review code",
                priority: 3,
                notes: "Notes for Review code",
                checklist: ["Subtask 1 for Review code", "Subtask 2 for Review code"],
                status: "Incomplete"
            }
        ]
    },
    {
        title: "Personal",
        tasks: [
            {
                title: "Call mom",
                dueDate: new Date(2025, 1, 5),
                description: "Description for Call mom",
                priority: 1,
                notes: "Notes for Call mom",
                checklist: ["Subtask 1 for Call mom", "Subtask 2 for Call mom"],
                status: "Incomplete"
            },
            {
                title: "Buy groceries",
                dueDate: new Date(2025, 1, 6),
                description: "Description for Buy groceries",
                priority: 2,
                notes: "Notes for Buy groceries",
                checklist: ["Subtask 1 for Buy groceries", "Subtask 2 for Buy groceries"],
                status: "Incomplete"
            }
        ]
    },
    {
        title: "Home Improvement",
        tasks: [
            {
                title: "Paint living room",
                dueDate: new Date(2025, 1, 10),
                description: "Description for Paint living room",
                priority: 3,
                notes: "Notes for Paint living room",
                checklist: ["Subtask 1 for Paint living room", "Subtask 2 for Paint living room"],
                status: "Incomplete"
            },
            {
                title: "Fix the leaky faucet",
                dueDate: new Date(2025, 1, 12),
                description: "Description for Fix the leaky faucet",
                priority: 2,
                notes: "Notes for Fix the leaky faucet",
                checklist: ["Subtask 1 for Fix the leaky faucet", "Subtask 2 for Fix the leaky faucet"],
                status: "Incomplete"
            },
            {
                title: "Install new lights",
                dueDate: new Date(2025, 1, 15),
                description: "Description for Install new lights",
                priority: 1,
                notes: "Notes for Install new lights",
                checklist: ["Subtask 1 for Install new lights", "Subtask 2 for Install new lights"],
                status: "Incomplete"
            }
        ]
    },
    {
        title: "Shopping List",
        tasks: [
            {
                title: "Buy milk",
                dueDate: new Date(2025, 1, 5),
                description: "Description for Buy milk",
                priority: 1,
                notes: "Notes for Buy milk",
                checklist: ["Subtask 1 for Buy milk", "Subtask 2 for Buy milk"],
                status: "Incomplete"
            },
            {
                title: "Buy eggs",
                dueDate: new Date(2025, 1, 6),
                description: "Description for Buy eggs",
                priority: 2,
                notes: "Notes for Buy eggs",
                checklist: ["Subtask 1 for Buy eggs", "Subtask 2 for Buy eggs"],
                status: "Incomplete"
            },
            {
                title: "Buy bread",
                dueDate: new Date(2025, 1, 7),
                description: "Description for Buy bread",
                priority: 3,
                notes: "Notes for Buy bread",
                checklist: ["Subtask 1 for Buy bread", "Subtask 2 for Buy bread"],
                status: "Incomplete"
            },
            {
                title: "Buy fruits",
                dueDate: new Date(2025, 1, 8),
                description: "Description for Buy fruits",
                priority: 1,
                notes: "Notes for Buy fruits",
                checklist: ["Subtask 1 for Buy fruits", "Subtask 2 for Buy fruits"],
                status: "Incomplete"
            }
        ]
    },
    {
        title: "Health & Fitness",
        tasks: [
            {
                title: "Morning workout",
                dueDate: new Date(2025, 1, 5),
                description: "Description for Morning workout",
                priority: 2,
                notes: "Notes for Morning workout",
                checklist: ["Subtask 1 for Morning workout", "Subtask 2 for Morning workout"],
                status: "Incomplete"
            },
            {
                title: "Yoga session",
                dueDate: new Date(2025, 1, 6),
                description: "Description for Yoga session",
                priority: 3,
                notes: "Notes for Yoga session",
                checklist: ["Subtask 1 for Yoga session", "Subtask 2 for Yoga session"],
                status: "Incomplete"
            },
            {
                title: "Healthy breakfast",
                dueDate: new Date(2025, 1, 7),
                description: "Description for Healthy breakfast",
                priority: 1,
                notes: "Notes for Healthy breakfast",
                checklist: ["Subtask 1 for Healthy breakfast", "Subtask 2 for Healthy breakfast"],
                status: "Incomplete"
            }
        ]
    }
];

// let currentProject = "Home";


function createProject(title) {
    const newProject = new Project(title);
    projects.push(newProject);
    render(projects, title);
};

function createTask(projectTitle, title, dueDate) {
    const newTask = new Task(title, dueDate);
    projects.forEach(project => {
        if (project.title == projectTitle) {
            project.tasks.push(newTask);
        };
    });
    render(projects, projectTitle);
};

function getProjects() {
    const projectsArr = projects;
    return projectsArr;
}



export { createProject, createTask, getProjects };