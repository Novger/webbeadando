import { useState } from "react";
import "./App.css";

function Calculator() {
    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [result, setResult] = useState("");

    function add() {
        setResult(Number(a) + Number(b));
    }

    function subtract() {
        setResult(Number(a) - Number(b));
    }

    return (
        <div className="box">
            <h2>Kalkulátor</h2>

            <input
                type="number"
                placeholder="Első szám"
                value={a}
                onChange={(e) => setA(e.target.value)}
            />

            <input
                type="number"
                placeholder="Második szám"
                value={b}
                onChange={(e) => setB(e.target.value)}
            />

            <button onClick={add}>Összeadás</button>
            <button onClick={subtract}>Kivonás</button>

            <h3>Eredmény: {result}</h3>
        </div>
    );
}

function LaptopAdvisor() {
    const [price, setPrice] = useState("");
    const [message, setMessage] = useState("");

    function checkLaptop() {
        if (Number(price) < 100000) {
            setMessage("Belépő kategóriás notebook ajánlott.");
        } else if (Number(price) < 180000) {
            setMessage("Középkategóriás notebook ajánlott.");
        } else {
            setMessage("Erősebb, prémium notebook ajánlott.");
        }
    }

    return (
        <div className="box">
            <h2>Notebook ajánló</h2>

            <input
                type="number"
                placeholder="Kereted Ft-ban"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <button onClick={checkLaptop}>Ajánlás</button>

            <h3>{message}</h3>
        </div>
    );
}

function App() {
    const [page, setPage] = useState("calculator");
    
    return (
        <div className="container">
            <h1>SPA alkalmazás</h1>

            <p>
                Ez egy egyoldalas alkalmazás, ahol a felhasználó különböző funkciók között válthat oldalfrissítés nélkül.
            </p>

            <nav className="menu">
                <button onClick={() => setPage("calculator")}>
                    Kalkulátor
                </button>
                <button onClick={() => setPage("advisor")}>
                    Notebook ajánló
                </button>
            </nav>

            {page === "calculator" && <Calculator />}
            {page === "advisor" && <LaptopAdvisor />}

            <button onClick={() => {
                window.location.href = "/index.html";
            }}>
                Vissza a főoldalra
            </button>
        </div>
    );
}

export default App;