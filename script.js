class TodoItem {
    constructor(task) {
        this.task = task;
        this.completed = false;
        this.createdAt = new Date();
    }

    display() {
        const taskList = document.getElementById("taskList");
        const index = shelf.tasks.indexOf(this);

        const taskItem = document.createElement("div");
        taskItem.classList.add("task");

        taskItem.addEventListener("dblclick", function () {
            editTask(index);
        });

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = this.completed;
        checkbox.addEventListener("change", () => {
            this.completed = checkbox.checked;
        });

        const taskText = document.createElement("span");
        taskText.classList.add("taskText");
        taskText.id = `taskText${index}`;
        taskText.textContent = this.task;

        const taskTime = document.createElement("span");
        taskTime.classList.add("taskTime");
        taskTime.id = `taskTime${index}`;
        taskTime.textContent = this.createdAt.toLocaleString();

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(document.createTextNode(" (Created: "));
        taskItem.appendChild(taskTime);
        taskItem.appendChild(document.createTextNode(")"));

        taskList.appendChild(taskItem);
    }
}

class TodoItemPremium extends TodoItem {
    constructor(task, iconUrl) {
        super(task);
        this.iconUrl = iconUrl;
    }

    display() {
        super.display();

        const index = shelf.tasks.indexOf(this);
        const icon = document.createElement("img");
        icon.style.width = "300px"; 
        icon.style.height = "300px";
        icon.src = this.iconUrl;
        icon.classList.add("taskIcon");

        const taskItem = document.getElementsByClassName("task")[index];
        taskItem.insertBefore(icon, taskItem.firstChild);
    }
}

class All_Tasks {
    constructor(tasks = []) {
        this.tasks = tasks;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(task) {
        const index = this.tasks.indexOf(task);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }

    delete_task_done(task) {
        const index = this.tasks.indexOf(task);
        if (this.completed = true) {
            this.tasks.splice(index, 1);
        }
    }
}


let sortOrder = 'descending'; 


function sortAscending() {
    sortOrder = 'ascending';
    DisplayTasks(shelf.tasks);
}

function sortDescending() {
    sortOrder = 'descending';
    DisplayTasks(shelf.tasks);
}

function DisplayTasks(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    if (sortOrder === 'ascending') {
        tasks.sort((a, b) => a.createdAt - b.createdAt);
    } else if (sortOrder === 'descending') {
        tasks.sort((a, b) => b.createdAt - a.createdAt);
    }

    tasks.forEach((task) => {
        task.display();
    });
}

function toggleSortOrder() {
    sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
    DisplayTasks(shelf.tasks);
}


function AddNewTask() {
    const taskInput = document.getElementById("task");
    const task = taskInput.value.trim();
    const iconUrl = "https://i.pinimg.com/564x/75/ee/12/75ee12d6e67c82af75d5b9c24baac546.jpg";

    if (task !== "") {
        const newPremiumTask = new TodoItemPremium(task, iconUrl);
        shelf.addTask(newPremiumTask);
        DisplayTasks(shelf.tasks);
        taskInput.value = "";
    } else {
        alert("Add task!");
    }
}

function confirmDelete() {
    const confirmation = confirm("Are you sure you want to delete all tasks?");
    if (confirmation) {
        shelf.tasks = [];
        DisplayTasks(shelf.tasks);
    }
}

function removeTask(taskText) {
    const taskToRemove = shelf.tasks.find(task => task.task === taskText);
    if (taskToRemove) {
        shelf.removeTask(taskToRemove);
        DisplayTasks(shelf.tasks);
    }
}

function changeStatus(taskText) {
    const taskToChange = shelf.tasks.find(task => task.task === taskText);
    if (taskToChange) {
        taskToChange.completed = !taskToChange.completed;
        DisplayTasks(shelf.tasks);
    }
}

function editTask(index) {
    const taskToEdit = shelf.tasks[index];

    if (taskToEdit) {
        const taskTextElement = document.getElementById(`taskText${index}`);
        const taskTimeElement = document.getElementById(`taskTime${index}`);

        const originalText = taskTextElement.textContent;
        const originalTime = taskTimeElement.textContent;

        taskTextElement.contentEditable = true;
        taskTextElement.focus();

        taskTextElement.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                taskTextElement.contentEditable = false;
                taskTextElement.blur();

                taskToEdit.task = taskTextElement.textContent;
                taskToEdit.createdAt = new Date();
                taskTimeElement.textContent = new Date().toLocaleString();

                DisplayTasks(shelf.tasks);
            } else if (event.key === "Escape") {
                taskTextElement.contentEditable = false;
                taskTextElement.textContent = originalText;
                taskTimeElement.textContent = originalTime;
            }
        });
    }
}

function delete_task_done() {
    const completedTasks = shelf.tasks.filter(task => task.completed);

    completedTasks.forEach(task => {
        shelf.removeTask(task);
    });

    DisplayTasks(shelf.tasks);
}

function pickRandomTask() {
    const taskItems = document.querySelectorAll(".task");
    
    if (taskItems.length === 0) {
        alert("No tasks available.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * taskItems.length);

    const highlightedTask = document.querySelector(".highlighted");
    if (highlightedTask) {
        highlightedTask.classList.remove("highlighted");
    }

    taskItems[randomIndex].classList.add("highlighted");
}



const shelf = new All_Tasks([]);
DisplayTasks(shelf.tasks);