# Web-приложение для работы с коллекциями данных

## 📌 Тема и цель работы

Разработка простого веб-приложения, позволяющего выполнять базовые операции с коллекциями данных (пример: список студентов).
Цель работы — освоить работу с динамическими структурами данных в браузере, взаимодействие с DOM и реализацию CRUD-функционала.

## 📌 Краткое описание функционала

Приложение позволяет:

* добавлять элементы в коллекцию;
* удалять элементы;
* выполнять поиск по имени;
* отображать полный список элементов;
* сортировать коллекцию по выбранному полю.

## 📌 Структура проекта
project/
│── index.html        # Основной интерфейс приложения
│── README.md         # Документация проекта

📌 Скриншот работы программы

<img width="1022" height="464" alt="image" src="https://github.com/user-attachments/assets/1c6bcbe4-1b37-4fbd-8340-8a639881fbfa" />


## 📌 Листинг кода (index.html)

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Коллекция данных</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 900px; margin: 20px auto; background: #f2f4f8; }
    header { background: linear-gradient(135deg, #4f46e5, #3b82f6); color: white; padding: 20px; border-radius: 16px; text-align: center; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
    input, button, select { padding: 10px; margin: 6px 0; border-radius: 10px; border: 1px solid #ccc; }
    button { background: #3b82f6; color: white; border: none; cursor: pointer; transition: 0.2s; }
    button:hover { background: #2563eb; }
    .card { background: white; padding: 16px; border-radius: 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px; }
    .item { padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <header>
    <h1>Менеджер коллекций</h1>
    <p>Добавляй, удаляй, ищи и сортируй данные удобно</p>
  </header>

  <div class="card">
    <input id="nameInput" placeholder="Имя студента" />
    <input id="ageInput" type="number" placeholder="Возраст" />
    <button onclick="addItem()">Добавить</button>
  </div>

  <div class="card">
    <input id="searchInput" placeholder="Поиск по имени" />
    <button onclick="searchItem()">Найти</button>
  </div>

  <div class="card">
    <select id="sortField">
      <option value="name">Имя</option>
      <option value="age">Возраст</option>
    </select>
    <button onclick="sortItems()">Сортировать</button>
  </div>

  <h3>Список:</h3>
  <div id="output" class="card"></div>

  <script>
    let students = [];

    function render() {
      const out = document.getElementById("output");
      out.innerHTML = students
        .map((s, i) =>
          `<div class='item'>${i + 1}. ${s.name}, ${s.age} лет <button onclick='removeItem(${i})'>Удалить</button></div>`
        )
        .join("");
    }

    function addItem() {
      const name = document.getElementById("nameInput").value.trim();
      const age = document.getElementById("ageInput").value;
      if (!name || !age) return;
      students.push({ name, age: Number(age) });
      render();
    }

    function removeItem(i) {
      students.splice(i, 1);
      render();
    }

    function searchItem() {
      const key = document.getElementById("searchInput").value.trim().toLowerCase();
      const out = document.getElementById("output");
      const results = students.filter(s => s.name.toLowerCase().includes(key));

      out.innerHTML = results.length
        ? results.map((s) => `<div class='item'>${s.name}, ${s.age} лет</div>`).join("")
        : "Ничего не найдено";
    }

    function sortItems() {
      const field = document.getElementById("sortField").value;
      students.sort((a, b) => (a[field] > b[field] ? 1 : -1));
      render();
    }
  </script>
</body>
</html>
