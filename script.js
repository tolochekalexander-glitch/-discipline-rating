const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQM0FIlSJiAxcJxj50l3wOZNMjEaO8uVfK17i7GVA1hOXaoir8ZCgNh4UuiOXlXECBA7gTFXDLDQB8h/pub?gid=0&single=true&output=csv";

async function loadData() {

    const tbody = document.getElementById("rating-body");
    tbody.innerHTML = `
        <tr>
            <td colspan="4">Загрузка...</td>
        </tr>
    `;

    try {

        const response = await fetch(CSV_URL);

        if (!response.ok) {
            throw new Error("Ошибка загрузки");
        }

        const text = await response.text();

        const lines = text
            .replace(/\r/g, "")
            .trim()
            .split("\n");

        const employees = [];

        for (let i = 1; i < lines.length; i++) {

            const cols = lines[i]
                .split(",")
                .map(item => item.replace(/^"|"$/g, "").trim());

            employees.push({
                name: cols[1] || "",
                points: parseInt(cols[2]) || 0,
                last: cols[3] || "-"
            });

        }

        employees.sort((a, b) => b.points - a.points);

        tbody.innerHTML = "";

        employees.forEach((employee, index) => {

            const tr = document.createElement("tr");

            if (index < 2) tr.classList.add("danger");
            if (index >= employees.length - 2) tr.classList.add("good");

            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${employee.name}</td>
                <td>${employee.points}</td>
                <td>${employee.last}</td>
            `;

            tbody.appendChild(tr);

        });

    } catch (e) {

        console.error(e);

        tbody.innerHTML = `
            <tr>
                <td colspan="4">
                    Ошибка загрузки данных
                </td>
            </tr>
        `;
    }

}

loadData();
