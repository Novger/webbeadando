import { useState } from "react";
import "./App.css";

function App() {
    const [laptops, setLaptops] = useState([
        { id: 1, gyarto: "HP", tipus: "COMPAQ 615", memoria: 1024, ar: 95120 },
        { id: 2, gyarto: "ASUS", tipus: "K51AC", memoria: 2048, ar: 101200 },
        { id: 3, gyarto: "ACER", tipus: "Aspire 5536G", memoria: 2048, ar: 111920 }
    ]);

    const [form, setForm] = useState({
        id: "",
        gyarto: "",
        tipus: "",
        memoria: "",
        ar: ""
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function saveLaptop() {
        if (!form.gyarto || !form.tipus || !form.memoria || !form.ar) {
            alert("Minden mezőt ki kell tölteni!");
            return;
        }

        if (form.id === "") {
            const newLaptop = {
                id: Date.now(),
                gyarto: form.gyarto,
                tipus: form.tipus,
                memoria: Number(form.memoria),
                ar: Number(form.ar)
            };

            setLaptops([...laptops, newLaptop]);
        } else {
            const updated = laptops.map((laptop) =>
                laptop.id === Number(form.id)
                    ? {
                        id: Number(form.id),
                        gyarto: form.gyarto,
                        tipus: form.tipus,
                        memoria: Number(form.memoria),
                        ar: Number(form.ar)
                    }
                    : laptop
            );

            setLaptops(updated);
        }

        clearForm();
    }

    function editLaptop(laptop) {
        setForm(laptop);
    }

    function deleteLaptop(id) {
        setLaptops(laptops.filter((laptop) => laptop.id !== id));
    }

    function clearForm() {
        setForm({
            id: "",
            gyarto: "",
            tipus: "",
            memoria: "",
            ar: ""
        });
    }

    return (
        <div className="container">
            <h1>React CRUD - Notebookok</h1>
            <h2>Notebook kezelő</h2>
            <div className="form">
                <input type="hidden" name="id" value={form.id} />

                <input
                    name="gyarto"
                    placeholder="Gyártó"
                    value={form.gyarto}
                    onChange={handleChange}
                />

                <input
                    name="tipus"
                    placeholder="Típus"
                    value={form.tipus}
                    onChange={handleChange}
                />

                <input
                    name="memoria"
                    type="number"
                    placeholder="Memória"
                    value={form.memoria}
                    onChange={handleChange}
                />

                <input
                    name="ar"
                    type="number"
                    placeholder="Ár"
                    value={form.ar}
                    onChange={handleChange}
                />

                <button onClick={saveLaptop}>Mentés</button>
                <button onClick={clearForm}>Űrlap törlése</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Gyártó</th>
                        <th>Típus</th>
                        <th>Memória</th>
                        <th>Ár</th>
                        <th>Műveletek</th>
                    </tr>
                </thead>
                <tbody>
                    {laptops.map((laptop) => (
                        <tr key={laptop.id}>
                            <td>{laptop.gyarto}</td>
                            <td>{laptop.tipus}</td>
                            <td>{laptop.memoria} MB</td>
                            <td>{laptop.ar} Ft</td>
                            <td>
                                <button onClick={() => editLaptop(laptop)}>
                                    Szerkesztés
                                </button>
                                <button onClick={() => deleteLaptop(laptop.id)}>
                                    Törlés
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={() => {
    window.location.href = "/index.html";
}}>
    Vissza a főoldalra
</button>
        </div>
    );
}

export default App;