document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') return;

    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <div class="buttons">
            <button class="complete-btn" onclick="completeTask(this)">Complete</button>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        </div>
    `;
    document.getElementById('taskList').appendChild(taskItem);

    saveTaskToLocal(taskText);

    taskInput.value = '';
}

function completeTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.classList.toggle('completed');
}

function deleteTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.remove();
    removeTaskFromLocal(taskItem.querySelector('span').textContent);
}

function saveTaskToLocal(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <div class="buttons">
                <button class="complete-btn" onclick="completeTask(this)">Complete</button>
                <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
            </div>
        `;
        document.getElementById('taskList').appendChild(taskItem);
    });
}

function removeTaskFromLocal(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}