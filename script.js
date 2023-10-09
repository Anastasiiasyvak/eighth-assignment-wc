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

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task");

        taskItem.addEventListener("dblclick", function () {
            editTask(tasks.indexOf(task));
        });

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
        });

        const taskText = document.createElement("span");
        taskText.classList.add("taskText");
        taskText.id = `taskText${index}`;
        taskText.textContent = task.task;

        const taskTime = document.createElement("span");
        taskTime.classList.add("taskTime");
        taskTime.id = `taskTime${index}`;
        taskTime.textContent = task.createdAt.toLocaleString();

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(document.createTextNode(" (Created: "));
        taskItem.appendChild(taskTime);
        taskItem.appendChild(document.createTextNode(")"));

        taskList.appendChild(taskItem);
    });
}









function AddNewTask() {
    const taskInput = document.getElementById("task");
    const task = taskInput.value.trim();

    if (task !== "") {
        const newTask = new Task(task);
        shelf.addTask(newTask);
        DisplayTasks(shelf.tasks);
        taskInput.value = "";
    } else {
        alert("Add the text!");
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

const shelf = new All_Tasks([]);
DisplayTasks(shelf.tasks);