const API = "backend/api.php";
const OPTIONS = "backend/options.php";
async function loadOptions() {
    let res = await fetch(OPTIONS);
    let data = await res.json();

    let procSelect = document.getElementById("processzor");
    let osSelect = document.getElementById("oprendszer");

    procSelect.innerHTML = "";
    osSelect.innerHTML = "";

    data.processzorok.forEach(p => {
        procSelect.innerHTML += `<option value="${p.id}">
            ${p.gyarto} ${p.tipus}
        </option>`;
    });

    data.oprendszerek.forEach(o => {
        osSelect.innerHTML += `<option value="${o.id}">
            ${o.nev}
        </option>`;
    });
}

async function loadData() {
    let res = await fetch(API);
    let response = await res.json();

    let table = document.getElementById("table");
    table.innerHTML = "";

    if (!response.success) {
        table.innerHTML = `
            <tr>
                <td colspan="7">Hiba történt: ${response.error}</td>
            </tr>
        `;
        return;
    }

    response.data.forEach(l => {
        table.innerHTML += `
            <tr>
                <td>${l.gyarto}</td>
                <td>${l.tipus}</td>
                <td>${l.memoria}</td>
                <td>${l.ar}</td>
                <td>${l.processzor_gyarto} ${l.processzor_tipus}</td>
                <td>${l.oprendszer_nev}</td>
                <td>
                    <button onclick="torles(${l.id})">Törlés</button>
                </td>
            </tr>
        `;
    });
}

async function addLaptop() {
    let data = {
        gyarto: document.getElementById("gyarto").value,
        tipus: document.getElementById("tipus").value,
        kijelzo: "15",
        memoria: document.getElementById("memoria").value,
        merevlemez: 256,
        videovezerlo: "integrált",
        ar: document.getElementById("ar").value,
        processzorid: document.getElementById("processzor").value,
        oprendszerid: document.getElementById("oprendszer").value,
        db: document.getElementById("db").value
    };

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    loadData();
}

async function torles(id) {
    if (!confirm("Biztosan törlöd ezt a notebookot?")) {
        return;
    }

    await fetch(API, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: id })
    });

    loadData();
}
loadOptions();
loadData();