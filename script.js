class Task {
    constructor(task) {
        this.task = task;
        this.completed = false;
        this.createdAt = new Date();
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

function DisplayTasks(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.sort((a, b) => b.createdAt - a.createdAt);

    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task");

        taskItem.innerHTML = `
            <p ${task.completed ? 'style="text-decoration: line-through;"' : ''}>
                <span id="taskText">${task.task}</span> (Created: <span id="taskTime">${task.createdAt.toLocaleString()}</span>)
            </p>
            <button class="button1" onclick="removeTask('${task.task}')">remove this task</button>
            <button class="button2" onclick="changeStatus('${task.task}')">Change status</button>
        `;

        taskItem.addEventListener("dblclick", function () {
            editTask(task.task);
        });

        taskList.appendChild(taskItem);
    });
}



function AddNewTask() {
    const taskInput = document.getElementById("task");
    const task = taskInput.value;
    const newTask = new Task(task);
    shelf.addTask(newTask);
    DisplayTasks(shelf.tasks);
    taskInput.value = "";
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

function changeStatus(taskText, button) {
    const taskToChange = shelf.tasks.find(task => task.task === taskText);
    if (taskToChange) {
        taskToChange.completed = !taskToChange.completed;
        DisplayTasks(shelf.tasks);
    }
}

function editTask(taskText) {
    const taskToEdit = shelf.tasks.find(task => task.task === taskText);

    if (taskToEdit) {
        const taskTextElement = document.getElementById("taskText");
        const taskTimeElement = document.getElementById("taskTime");

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

const shelf = new All_Tasks([]);
DisplayTasks(shelf.tasks);