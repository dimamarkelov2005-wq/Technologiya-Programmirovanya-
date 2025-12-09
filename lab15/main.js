// main.js
// Модуль отвечает за UI логику и Controller

import { addTask, deleteTask, getTasksByStatus, loadTasks, runUnitTest } from './dataService.js';

// === UI Elements & Rendering ===

const COLUMNS = {
    'DRAFT': document.getElementById('draft-column'),
    'IN_PROGRESS': document.getElementById('progress-column'),
    'EDITING': document.getElementById('editing-column'),
    'DONE': document.getElementById('done-column')
};
const form = document.getElementById('add-task-form');
const unitTestButton = document.getElementById('unit-test-button');


function getFormData() {
    return {
        title: document.getElementById('task-title').value.trim(),
        description: document.getElementById('task-description').value.trim(),
        status: document.getElementById('task-status').value
    };
}

function clearForm() {
    form.reset();
    document.getElementById('task-status').value = "DRAFT";
}

function createCardElement(task) {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.dataset.id = task.id;
    
    let borderColor = 'var(--accent-blue)'; 
    if (task.status === 'DRAFT') borderColor = 'var(--color-draft)';
    else if (task.status === 'IN_PROGRESS') borderColor = 'var(--color-progress)';
    else if (task.status === 'EDITING') borderColor = 'var(--color-editing)';
    else if (task.status === 'DONE') borderColor = 'var(--color-done)';
    
    card.style.borderLeftColor = borderColor;

    card.innerHTML = `
        <div class="task-title">${task.title}</div>
        <div style="font-size: 13px; color: var(--text-light); opacity: 0.8; margin-bottom: 8px;">${task.description}</div>
        <div class="task-meta">
            <div class="task-icons">
                <span title="Comments">💬</span>
                <span title="Priority">⭐</span>
            </div>
            <button class="delete-btn" data-id="${task.id}">🗑 Удалить</button>
        </div>
    `;

    const deleteButton = card.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => handleDelete(task.id));
    return card;
}

function renderBoard(tasksByStatus) {
    // 1. Очистка всех колонок (сохраняя заголовки)
    Object.values(COLUMNS).forEach(col => {
        const header = col.querySelector('.column-header');
        // Удаляем все, кроме первого элемента (заголовка)
        while (col.lastChild && col.lastChild !== header) { 
            col.removeChild(col.lastChild);
        }
    });

    // 2. Рендеринг задач
    for (const status in tasksByStatus) {
        const tasks = tasksByStatus[status];
        const column = COLUMNS[status];
        
        tasks.forEach(task => {
            const cardElement = createCardElement(task);
            column.appendChild(cardElement);
        });
    }
}


// === Controller Logic ===

function refreshBoard() {
    const tasksByStatus = {
        'DRAFT': getTasksByStatus('DRAFT'),
        'IN_PROGRESS': getTasksByStatus('IN_PROGRESS'),
        'EDITING': getTasksByStatus('EDITING'),
        'DONE': getTasksByStatus('DONE')
    };
    renderBoard(tasksByStatus);
}

function handleAdd(event) {
    event.preventDefault(); // Остановить стандартное действие формы
    const data = getFormData();
    
    if (!data.title || !data.description || !data.status) {
        alert('Заполните все поля!');
        return;
    }

    addTask(data);
    clearForm();
    refreshBoard();
}

function handleDelete(id) {
    if (confirm('Удалить эту задачу?')) {
        deleteTask(id);
        refreshBoard();
    }
}

// === Initialization ===

function init() {
    // Загрузка данных при старте
    loadTasks();
    // Привязка событий
    form.addEventListener('submit', handleAdd);
    unitTestButton.addEventListener('click', runUnitTest);

    // Первичный рендеринг
    refreshBoard();
    console.log("Канбан-доска 'Task Management' запущена.");
}

init();
