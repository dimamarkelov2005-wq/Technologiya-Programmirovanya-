// dataService.js
// Модуль отвечает за взаимодействие с LocalStorage и хранение данных (Map)

const STORAGE_KEY = 'kanbanData';
let tasks = new Map(); 

function loadTasks() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        const arrayData = JSON.parse(data);
        tasks = new Map(arrayData.map(item => [item.id, item]));
    }
}

function saveTasks() {
    const arrayData = Array.from(tasks.values());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arrayData));
}

export function addTask(data) {
    const id = Date.now().toString(); 
    const newTask = {
        id: id,
        title: data.title,
        description: data.description,
        status: data.status,
        category: 'Main Task' 
    };
    tasks.set(id, newTask);
    saveTasks();
    return newTask;
}

export function deleteTask(id) {
    const wasDeleted = tasks.delete(id);
    if (wasDeleted) {
        saveTasks();
    }
    return wasDeleted;
}

export function getTasksByStatus(status) {
    return Array.from(tasks.values()).filter(task => task.status === status);
}

// Функции для Unit-теста (вынесены для изолированного тестирования)
function runUnitTest() {
    console.log('--- Запуск Unit-теста (Data Service) ---');
    
    const STORAGE_KEY_TEST = 'kanbanDataTest';
    let testMap = new Map();

    function saveTestTasks(map) {
        localStorage.setItem(STORAGE_KEY_TEST, JSON.stringify(Array.from(map.values())));
    }
    function addTestTask(data, map) {
        const id = 'test' + Date.now();
        const newTask = { ...data, id: id, status: data.status };
        map.set(id, newTask);
        saveTestTasks(map);
        return id;
    }

    // --- Тест 1: Добавление задачи ---
    const initialSize = testMap.size;
    const testData = { title: "Test Task", description: "Unit test description", status: "DRAFT" };
    const addedId = addTestTask(testData, testMap);

    console.assert(
        testMap.size === initialSize + 1,
        'Test 1 Failed (Add): Размер Map не увеличился.'
    );
    console.log(`Test 1 (Add Task): ${testMap.size === initialSize + 1 ? 'УСПЕШНО' : 'ОШИБКА'}`);

    // --- Тест 2: Проверка данных в LocalStorage ---
    const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY_TEST));
    console.assert(
        storedData && storedData.some(t => t.id === addedId),
        'Test 2 Failed (LocalStorage): Добавленный элемент не найден в хранилище.'
    );
    console.log(`Test 2 (LocalStorage Check): ${storedData && storedData.some(t => t.id === addedId) ? 'УСПЕШНО' : 'ОШИБКА'}`);
    
    console.log('--- Unit-тест завершен. Проверьте сообщения выше. ---');
    localStorage.removeItem(STORAGE_KEY_TEST); 
}
export { loadTasks, runUnitTest };
