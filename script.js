const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQM0FIlSJiAxcJxj50l3wOZNMjEaO8uVfK17i7GVA1hOXaoir8ZCgNh4UuiOXlXECBA7gTFXDLDQB8h/pub?gid=681008903&single=true&output=csv";

async function loadData() {

    console.log("Старт");

    const tbody = document.getElementById("rating-body");

    try {

        console.log("Запрашиваем CSV...");

        const response = await fetch(CSV_URL);

        console.log("Статус:", response.status);

        const text = await response.text();

        console.log("CSV:");
        console.log(text);

    } catch (error) {

        console.error("Ошибка:", error);

    }

}

loadData();
