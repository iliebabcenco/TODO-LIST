import { createToDo, removeTodo, editTodo } from './todos'
import createProject from './projects'
import { format } from 'date-fns'
import showBtn from "./project-dom"

const toDoList = []
const toDoList2 = []
const projects = []

const firstProject = createProject("First Project", "Firts Project Description", toDoList)
const secondProject = createProject("Second Project", "Second Project Description", toDoList2)
projects.push(firstProject)
projects.push(secondProject)

const firstTask = createToDo("New Task", "New Task Description", new Date(), true)
const secondTask = createToDo("New Task 2", "New Task Description 2", new Date(), false)
const thirdTask = createToDo("New Task 3", "New Task Description 3", new Date(), true)
toDoList.push(firstTask)
toDoList2.push(secondTask)
toDoList2.push(thirdTask)

const addTaskBtn = document.getElementById('add-task-btn')
const saveBtn = document.getElementById('save-btn')
const editBtn = document.getElementById('edit-btn')

const projectsDraw = (projects) => {
    addTaskBtn.style.display = 'none'

    const projectsContainer = document.getElementById('projectsContainer')
    projectsContainer.innerHTML = ""
    projects.forEach((project) => {
        const link = document.createElement('a')
        link.setAttribute('class', "nav-link")
        projectsContainer.appendChild(link)
        link.innerText = project.title
        link.onclick = () => {
            taskDraw(project.todoes)
            saveBtn.onclick = () => {
                const title = document.getElementById('title').value
                const description = document.getElementById('description').value
                const dueTime = document.getElementById('dueDate').value
                const priority = document.getElementById('priority')
                const links = document.getElementsByClassName('nav-link')
                const id = Array.prototype.indexOf.call(links, link);
                projects[id].todoes.push(createToDo(title, description, new Date(dueTime), priority.checked))
                taskDraw(project.todoes)
                document.getElementById("add-form").reset();
            }
        }

    })
}

const taskDraw = (tasks) => {
    const content = document.querySelector('.content-div')
    content.innerHTML = ""
    const main = document.querySelector('main')
    addTaskBtn.style.display = 'block'
    addTaskBtn.onclick = () => {
        saveBtn.style.display = 'block'
        editBtn.style.display = 'none'
        document.getElementById("add-form").reset();
    }
    main.appendChild(addTaskBtn)
    main.appendChild(content)
    tasks.forEach((todo) => {
        const card = document.createElement('div')
        const cardBody = document.createElement('div')
        const cardTitle = document.createElement('h3')
        const cardSub = document.createElement('h6')
        const cardText = document.createElement('p')
        const editLink = document.createElement('button')
        const removeLink = document.createElement('a')
        let priority = "Priority: LOW"
        if (todo.priority) {
            priority = "Priority: HIGH"
        }

        cardTitle.innerHTML = todo.title
        cardSub.innerHTML = todo.dueDate
        cardText.innerHTML = todo.description + "<br>" + priority
        editLink.innerHTML = 'Edit'
        removeLink.innerHTML = 'Remove'

        card.setAttribute('class', 'card')
        cardBody.setAttribute('class', 'card-body')
        cardTitle.setAttribute('class', 'card-title')
        cardSub.setAttribute('class', 'card-subtitle mb-2 text-muted')
        cardText.setAttribute('class', 'card-text')
        editLink.setAttribute('class', 'card-link btn btn-light')
        removeLink.setAttribute('class', 'card-link btn btn-danger')

        content.appendChild(card)
        card.appendChild(cardBody)
        card.appendChild(cardTitle)
        card.appendChild(cardSub)
        card.appendChild(cardText)
        card.appendChild(editLink)
        card.appendChild(removeLink)

        removeLink.onclick = () => {
            const id = tasks.indexOf(todo);
            removeTodo(tasks, id);
            document.getElementsByClassName("card")[id].remove();
        };

        editLink.setAttribute('data-bs-toggle', 'modal')
        editLink.setAttribute('data-bs-target', '#exampleModal')
        editLink.setAttribute('type', 'button')


        editLink.onclick = () => {
            saveBtn.style.display = 'none'
            editBtn.style.display = 'block'
            document.getElementById('title').value = todo.title
            document.getElementById('description').value = todo.description
            document.getElementById('dueDate').value = format(todo.dueDate, 'yyyy-MM-dd')
            document.getElementById('priority').checked = todo.priority
        }

        editBtn.onclick = () => {
            const title = document.getElementById('title').value
            const description = document.getElementById('description').value
            const dueTime = document.getElementById('dueDate').value
            const priority = document.getElementById('priority').checked
            console.log("todo's title = " + todo.title)
            editTodo(todo, title, description, dueTime, priority)
        }

    })
}

const showProjectBtn = document.getElementById("newProBtn");
const addProjectBtn = document.getElementById("button-addon1");
showProjectBtn.onclick = () => {
    const findDiv = document.getElementById("project-div");
    if (findDiv.style.display === "none") {
        findDiv.style.display = "block";
    } else {
        findDiv.style.display = "none";
    }
};

addProjectBtn.onclick = () => {
    const projectTitle = document.getElementById("projectTitle").value;
    const projectDesc = document.getElementById("projectDesc").value;
    projects.push(createProject(projectTitle, projectDesc, []));
    projectsDraw(projects);
};

const start = (projects) => {
    projectsDraw(projects)
}


start(projects)

