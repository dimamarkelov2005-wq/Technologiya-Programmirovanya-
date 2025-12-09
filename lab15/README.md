# Task Management — Канбан (Рабочая версия)

## *Название работы*

Разработка веб‑приложения «Task Management — Kanban Board».

## *Цель работы*

Создать интерактивную веб‑доску задач (канбан) с добавлением, отображением и удалением карточек, локальным хранилищем и базовой архитектурой модулей.

## *Описание проекта*

Проект представляет собой одностраничное веб‑приложение, реализующее канбан‑доску с четырьмя колонками: Draft, In Progress, Editing и Done. Пользователь может:

* добавлять задачи через форму;
* удалять задачи;
* автоматически сохранять данные в LocalStorage;
* запускать встроенный unit‑тест.

Интерфейс выполнен в тёмной цветовой схеме, включает сайдбар, метрики и модульную структуру JavaScript‑кода.

## *Структура проекта*


project/
│── index.html              # Основной файл интерфейса и логики
│
├── data-service (script)   # Работа с LocalStorage и данными
├── ui-service (script)     # Рендеринг интерфейса
├── main-controller (script)# Основная логика приложения
└── unit-test (script)      # Встроенный unit-тест


## *Скриншот интерфейса*

<img width="1901" height="927" alt="image" src="https://github.com/user-attachments/assets/d4a9c470-363e-4157-b6ef-143ab5227d63" />



## *Примеры кода*

### Добавление задачи

javascript
function addTask(data) {
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


### Рендер карточек

javascript
function renderBoard(tasksByStatus, onDelete) {
    Object.values(COLUMNS).forEach(col => {
        const header = col.querySelector('.column-header');
        while (col.lastChild !== header) {
            col.removeChild(col.lastChild);
        }
    });

    for (const status in tasksByStatus) {
        tasksByStatus[status].forEach(task => {
            const card = createCardElement(task, onDelete);
            COLUMNS[status].appendChild(card);
        });
    }
}


### Unit‑тест

javascript
console.assert(
    testMap.size === initialSize + 1,
    'Test 1 Failed (Add): размер Map не увеличился.'
);


## *Инструкция по запуску*

1. Склонировать репозиторий:


git clone <repository-url>


2. Установить зависимости:


npm install


3. Запустить тесты:


npm test


4. Открыть проект в браузере:

* просто откройте файл *index.html*

## *Ссылка на репозиторий*

(вставьте ссылку)

## *Выводы по работе*

Разработано простое и удобное приложение‑канбан, демонстрирующее модульный JavaScript‑подход, работу с DOM, локальным хранилищем и базовой системой тестирования. Структура проекта позволяет легко расширять функционал и интегрировать дополнительные возможности в дальнейшем.
Персистентность: Использование LocalStorage обеспечивает базовый уровень сохранения данных, что критически важно для любого инструмента управления задачами.

Дальнейшее развитие: Следующим шагом может стать добавление функционала Drag and Drop (DND) для перемещения задач между колонками, что является ключевой особенностью Канбан-досок.
