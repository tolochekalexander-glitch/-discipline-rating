const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQM0FIlSJiAxcJxj50l3wOZNMjEaO8uVfK17i7GVA1hOXaoir8ZCgNh4UuiOXlXECBA7gTFXDLDQB8h/pub?gid=681008903&single=true&output=csv";

async function loadData() {

    const tbody = document.getElementById("rating-body");
    tbody.innerHTML = "<tr><td colspan='4'>Загрузка...</td></tr>";

    try {

        const response = await fetch(CSV_URL);
        const text = await response.text();

        const rows = text.trim().split(/\r?\n/).slice(1);

        const employees = rows.map(row => {

            const cols = row.split(",");

            return {
                name: cols[1].replace(/"/g, "").trim(),
                points: Number(cols[2]) || 0,
                last: (cols[3] || "—").replace(/"/g, "").trim()
            };

        });

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
                <td>${employee.last || "—"}</td>
            `;

            tbody.appendChild(tr);

        });

    } catch (error) {

        console.error(error);

        tbody.innerHTML = `
            <tr>
                <td colspan="4">Ошибка загрузки данных</td>
            </tr>
        `;

    }

}

loadData();
