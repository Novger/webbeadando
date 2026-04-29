class Laptop {
    constructor(gyarto, tipus, ar) {
        this.gyarto = gyarto;
        this.tipus = tipus;
        this.ar = ar;
    }

    kartyaLetrehozasa() {
        let div = document.createElement("div");

        div.style.background = "white";
        div.style.margin = "15px auto";
        div.style.padding = "15px";
        div.style.borderRadius = "10px";
        div.style.maxWidth = "600px";
        div.style.boxShadow = "0 0 8px #bbb";

        div.innerHTML = `
            <h3>${this.gyarto} ${this.tipus}</h3>
            <p>Ár: ${this.ar} Ft</p>
        `;

        document.body.appendChild(div);
    }
}

class AkciosLaptop extends Laptop {
    constructor(gyarto, tipus, ar, kedvezmeny) {
        super(gyarto, tipus, ar);
        this.kedvezmeny = kedvezmeny;
    }

    kartyaLetrehozasa() {
        let akciosAr = this.ar - (this.ar * this.kedvezmeny / 100);

        let div = document.createElement("div");

        div.style.background = "#fff7d6";
        div.style.margin = "15px auto";
        div.style.padding = "15px";
        div.style.borderRadius = "10px";
        div.style.maxWidth = "600px";
        div.style.boxShadow = "0 0 8px #bbb";
        div.style.border = "2px solid #e0a800";

        div.innerHTML = `
            <h3>${this.gyarto} ${this.tipus}</h3>
            <p>Eredeti ár: ${this.ar} Ft</p>
            <p>Kedvezmény: ${this.kedvezmeny}%</p>
            <p><strong>Akciós ár: ${Math.round(akciosAr)} Ft</strong></p>
        `;

        document.body.appendChild(div);
    }
}

function ujAlapLaptop() {
    let laptop = new Laptop("HP", "COMPAQ 615", 95120);
    laptop.kartyaLetrehozasa();
}

function ujAkciosLaptop() {
    let laptop = new AkciosLaptop("ASUS", "K51AC", 101200, 15);
    laptop.kartyaLetrehozasa();
}