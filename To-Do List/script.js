document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToList(task));
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => li.querySelector('.task').textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTaskToList(task) {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = task;
        span.classList.add('task');
        li.appendChild(span);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit');
        li.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete');
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    }

    addTaskBtn.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task) {
            addTaskToList(task);
            saveTasks();
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.remove();
            saveTasks();
        } else if (e.target.classList.contains('edit')) {
            const li = e.target.parentElement;
            const taskSpan = li.querySelector('.task');
            const newTask = prompt('Edit task', taskSpan.textContent);
            if (newTask) {
                taskSpan.textContent = newTask;
                saveTasks();
            }
        }
    });

    loadTasks();
});