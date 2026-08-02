const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQM0FIlSJiAxcJxj50l3wOZNMjEaO8uVfK17i7GVA1hOXaoir8ZCgNh4UuiOXlXECBA7gTFXDLDQB8h/pub?gid=681008903&single=true&output=csv";

async function loadData() {

    const tbody = document.getElementById("rating-body");

    console.log("tbody =", tbody);

    tbody.innerHTML = "<tr><td colspan='4'>Загрузка...</td></tr>";

    try {

        const response = await fetch(CSV_URL);
        console.log("status =", response.status);

        const text = await response.text();
        console.log("text =", text);

        const rows = text.trim().split(/\r?\n/).slice(1);
        console.log("rows =", rows.length);

        const employees = rows.map(row => {

            const cols = row.split(",");

            return {
                name: (cols[1] || "").trim(),
                points: Number(cols[2]) || 0,
                last: (cols[3] || "—").trim()
            };

        }).filter(e => e.name !== "");

        console.log("employees =", employees);

        employees.sort((a, b) => b.points - a.points);

        tbody.innerHTML = "";

        employees.forEach((employee, index) => {

            console.log("Добавляем", employee.name);

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

        console.log("ГОТОВО");

    } catch (error) {

        console.error("Ошибка:", error);

    }

}

loadData();
