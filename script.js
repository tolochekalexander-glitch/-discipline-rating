const employees = [
    { name: "Денис С", points: 4, last: "+2 Телефон" },
    { name: "Денис Л", points: 1, last: "+1 Опоздание" },
    { name: "Диана Е", points: 0, last: "-" },
    { name: "Настя Б", points: 6, last: "+2 Телефон" },
    { name: "Влад О", points: 2, last: "+2 Телефон" },
    { name: "Лера П", points: 0, last: "-1 Помощь коллеге" },
    { name: "Нелли О", points: 3, last: "+1 Форма" },
    { name: "Настя П", points: 0, last: "-" },
    { name: "Данил С", points: 5, last: "+2 Опоздание" },
    { name: "Ратмир К", points: 1, last: "-1 Отличная смена" },
    { name: "Амаль А", points: 2, last: "+2 Телефон" },
    { name: "Артур Б", points: 0, last: "-" },
    { name: "Олеся Б", points: 1, last: "-1 Помощь коллеге" },
    { name: "Севда Ч", points: 0, last: "-" }
];

// Сортировка по количеству баллов
employees.sort((a, b) => b.points - a.points);

const tbody = document.getElementById("rating-body");

// Очищаем таблицу
tbody.innerHTML = "";

// Заполняем таблицу
employees.forEach((employee, index) => {

    const row = document.createElement("tr");

    if (index < 2) {
        row.classList.add("danger");
    } else if (index >= employees.length - 2) {
        row.classList.add("good");
    }

    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${employee.name}</td>
        <td>${employee.points}</td>
        <td>${employee.last}</td>
    `;

    tbody.appendChild(row);

});

// Дата последнего обновления
const now = new Date();

const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
};

const updateElement = document.getElementById("last-update");

if (updateElement) {
    updateElement.textContent = now.toLocaleString("ru-RU", options);
}