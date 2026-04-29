let laptops = [
    {
        id: 1,
        gyarto: "HP",
        tipus: "COMPAQ 615 NX556EA",
        memoria: 1024,
        ar: 95120
    },
    {
        id: 2,
        gyarto: "ASUS",
        tipus: "K51AC-SX001D",
        memoria: 2048,
        ar: 101200
    },
    {
        id: 3,
        gyarto: "ACER",
        tipus: "Aspire 5536G",
        memoria: 2048,
        ar: 111920
    }
];

let nextId = 4;

function renderTable() {
    let table = document.getElementById("laptopTable");
    table.innerHTML = "";

    for (let i = 0; i < laptops.length; i++) {
        let laptop = laptops[i];

        table.innerHTML += `
            <tr>
                <td>${laptop.gyarto}</td>
                <td>${laptop.tipus}</td>
                <td>${laptop.memoria} MB</td>
                <td>${laptop.ar} Ft</td>
                <td>
                    <button onclick="editLaptop(${laptop.id})">Szerkesztés</button>
                    <button onclick="deleteLaptop(${laptop.id})">Törlés</button>
                </td>
            </tr>
        `;
    }
}

function saveLaptop() {
    let editId = document.getElementById("editId").value;
    let gyarto = document.getElementById("gyarto").value;
    let tipus = document.getElementById("tipus").value;
    let memoria = document.getElementById("memoria").value;
    let ar = document.getElementById("ar").value;

    if (gyarto === "" || tipus === "" || memoria === "" || ar === "") {
        alert("Minden mezőt ki kell tölteni!");
        return;
    }

    if (editId === "") {
        let newLaptop = {
            id: nextId,
            gyarto: gyarto,
            tipus: tipus,
            memoria: Number(memoria),
            ar: Number(ar)
        };

        laptops.push(newLaptop);
        nextId++;
    } else {
        for (let i = 0; i < laptops.length; i++) {
            if (laptops[i].id === Number(editId)) {
                laptops[i].gyarto = gyarto;
                laptops[i].tipus = tipus;
                laptops[i].memoria = Number(memoria);
                laptops[i].ar = Number(ar);
            }
        }
    }

    clearForm();
    renderTable();
}

function editLaptop(id) {
    for (let i = 0; i < laptops.length; i++) {
        if (laptops[i].id === id) {
            document.getElementById("editId").value = laptops[i].id;
            document.getElementById("gyarto").value = laptops[i].gyarto;
            document.getElementById("tipus").value = laptops[i].tipus;
            document.getElementById("memoria").value = laptops[i].memoria;
            document.getElementById("ar").value = laptops[i].ar;
        }
    }
}

function deleteLaptop(id) {
    let newList = [];

    for (let i = 0; i < laptops.length; i++) {
        if (laptops[i].id !== id) {
            newList.push(laptops[i]);
        }
    }

    laptops = newList;
    renderTable();
}

function clearForm() {
    document.getElementById("editId").value = "";
    document.getElementById("gyarto").value = "";
    document.getElementById("tipus").value = "";
    document.getElementById("memoria").value = "";
    document.getElementById("ar").value = "";
}

renderTable();