import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "/backend/api.php";
const OPTIONS = "/backend/options.php";

function App() {
    const [laptops, setLaptops] = useState([]);
    const [processzorok, setProcesszorok] = useState([]);
    const [oprendszerek, setOprendszerek] = useState([]);

    const [form, setForm] = useState({
        id: "",
        gyarto: "",
        tipus: "",
        kijelzo: "15,6",
        memoria: "",
        merevlemez: "",
        videovezerlo: "",
        ar: "",
        processzorid: "",
        oprendszerid: "",
        db: ""
    });

    useEffect(() => {
        loadOptions();
        loadLaptops();
    }, []);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function loadOptions() {
        const res = await axios.get(OPTIONS);

        setProcesszorok(res.data.processzorok);
        setOprendszerek(res.data.oprendszerek);

        if (res.data.processzorok.length > 0 && res.data.oprendszerek.length > 0) {
            setForm((oldForm) => ({
                ...oldForm,
                processzorid: res.data.processzorok[0].id,
                oprendszerid: res.data.oprendszerek[0].id
            }));
        }
    }

    async function loadLaptops() {
    const res = await axios.get(API);

    if (res.data.success === true) {
        setLaptops(res.data.data);
    } else {
        alert(res.data.error || "Hiba történt a notebookok betöltésekor.");
    }
}

    async function saveLaptop() {
        if (
            form.gyarto === "" ||
            form.tipus === "" ||
            form.memoria === "" ||
            form.merevlemez === "" ||
            form.videovezerlo === "" ||
            form.ar === "" ||
            form.db === ""
        ) {
            alert("Minden mezőt ki kell tölteni!");
            return;
        }

        const data = {
            ...form,
            memoria: Number(form.memoria),
            merevlemez: Number(form.merevlemez),
            ar: Number(form.ar),
            processzorid: Number(form.processzorid),
            oprendszerid: Number(form.oprendszerid),
            db: Number(form.db)
        };

        if (form.id === "") {
            await axios.post(API, data);
        } else {
            await axios.put(API, data);
        }

        clearForm();
        loadLaptops();
    }

    function editLaptop(laptop) {
        setForm({
            id: laptop.id,
            gyarto: laptop.gyarto,
            tipus: laptop.tipus,
            kijelzo: laptop.kijelzo,
            memoria: laptop.memoria,
            merevlemez: laptop.merevlemez,
            videovezerlo: laptop.videovezerlo,
            ar: laptop.ar,
            processzorid: laptop.processzorid,
            oprendszerid: laptop.oprendszerid,
            db: laptop.db
        });
    }

    async function deleteLaptop(id) {
        await axios.delete(API, {
            data: { id: id }
        });

        loadLaptops();
    }

    function clearForm() {
        setForm({
            id: "",
            gyarto: "",
            tipus: "",
            kijelzo: "15,6",
            memoria: "",
            merevlemez: "",
            videovezerlo: "",
            ar: "",
            processzorid: processzorok.length > 0 ? processzorok[0].id : "",
            oprendszerid: oprendszerek.length > 0 ? oprendszerek[0].id : "",
            db: ""
        });
    }

    return (
        <div className="container">
            <h1>Axios CRUD - Notebook adatbázis</h1>

            <div className="form">
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
                    name="kijelzo"
                    placeholder="Kijelző"
                    value={form.kijelzo}
                    onChange={handleChange}
                />

                <input
                    name="memoria"
                    type="number"
                    placeholder="Memória MB"
                    value={form.memoria}
                    onChange={handleChange}
                />

                <input
                    name="merevlemez"
                    type="number"
                    placeholder="Merevlemez GB"
                    value={form.merevlemez}
                    onChange={handleChange}
                />

                <input
                    name="videovezerlo"
                    placeholder="Videovezérlő"
                    value={form.videovezerlo}
                    onChange={handleChange}
                />

                <input
                    name="ar"
                    type="number"
                    placeholder="Ár"
                    value={form.ar}
                    onChange={handleChange}
                />

                <select
                    name="processzorid"
                    value={form.processzorid}
                    onChange={handleChange}
                >
                    {processzorok.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.gyarto} {p.tipus}
                        </option>
                    ))}
                </select>

                <select
                    name="oprendszerid"
                    value={form.oprendszerid}
                    onChange={handleChange}
                >
                    {oprendszerek.map((o) => (
                        <option key={o.id} value={o.id}>
                            {o.nev}
                        </option>
                    ))}
                </select>

                <input
                    name="db"
                    type="number"
                    placeholder="Darab"
                    value={form.db}
                    onChange={handleChange}
                />

                <button onClick={saveLaptop}>
                    {form.id === "" ? "Hozzáadás" : "Módosítás"}
                </button>

                <button onClick={clearForm}>Űrlap törlése</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Gyártó</th>
                        <th>Típus</th>
                        <th>Memória</th>
                        <th>HDD</th>
                        <th>Videókártya</th>
                        <th>Ár</th>
                        <th>Processzor</th>
                        <th>OS</th>
                        <th>DB</th>
                        <th>Művelet</th>
                    </tr>
                </thead>
                <tbody>
                    {laptops.map((laptop) => (
                        <tr key={laptop.id}>
                            <td>{laptop.gyarto}</td>
                            <td>{laptop.tipus}</td>
                            <td>{laptop.memoria} MB</td>
                            <td>{laptop.merevlemez} GB</td>
                            <td>{laptop.videovezerlo}</td>
                            <td>{laptop.ar} Ft</td>
                            <td>
                                {laptop.processzor_gyarto} {laptop.processzor_tipus}
                            </td>
                            <td>{laptop.oprendszer_nev}</td>
                            <td>{laptop.db}</td>
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