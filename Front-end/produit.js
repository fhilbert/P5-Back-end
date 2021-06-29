// produit.js

const url = window.location.href;

const urlObj = new URL(url);

const id = urlObj.searchParams.get("id");

class Teddy {
	constructor(id, image, nom, color, price, nbArticles) {
		this.id = id;
		this.image = image;
		this.nom = nom;
		this.color = color;
		this.price = price;
		this.nbArticles = nbArticles;
	}
}

console.log("id " + id);
getTeddy();

//  document.querySelector("#order").addEventListener("click", choix);

function getTeddy() {
	fetch("http://localhost:3000/api/teddies/" + id)
		.then((res) => res.json())
		.then((teddy) => {
			// 	// test

			console.log(teddy);

			let h1 = document.querySelector("h1");
			h1.innerText = teddy.name;
			let imageUrl = document.getElementById("imageUrl");
			imageUrl.src = teddy.imageUrl;
			let h5 = document.querySelector("h5");
			h5.innerText = teddy.name;
			let description = document.querySelector("#description");
			description.innerText = teddy.description;
			let price = document.querySelector("#price");

			price.innerText = teddy.price.toFixed(2) / 100;
			//price.innerText += " €";

			let color = `<label for="choix-select">Couleurs:</label>
			<select name="choix" id="choix-select" onchange="getColor();">
			`;
			for (let i = 0; i < teddy.colors.length; i++) {
				if (i === 0) {
					color += ` <option value="${teddy.colors[i]}" selected>${teddy.colors[i]}</option>`;
				} else {
					color += ` <option value="${teddy.colors[i]}">${teddy.colors[i]}</option>`;
				}
			}
			let ref = document.querySelector("#ref");
			ref.innerText = `Ref :  ${teddy._id}`;

			document.getElementById("color").innerHTML = color;
			document.getElementById("nbArticles").innerHTML = nbArticles;

			let cardbody = document.querySelector(".card-body");
			cardbody.style.backgroundColor = "#e3a8d5";
			console.log("getTeddy " + teddy);
		});
}

// UI class : handle UI Tasks
function displayTeddies() {
	const teddies = getTeddies();
	console.log(teddies);
}
function showAlert(message, className) {
	const div = document.createElement("div");
	div.className = `alert alert-${className}`;
	div.appendChild(document.createTextNode(message));
	const container = document.querySelector(".container");
	const form = document.getElementById("teddy-form");
	container.insertBefore(div, form);
	// vanish in 3 seconds
	setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Handles storage

function getTeddies() {
	let teddies = [];

	if (localStorage.getItem("teddies") === null) {
		teddies = [];
		console.log("teddies : " + teddies);
	} else {
		teddies = JSON.parse(localStorage.getItem("teddies"));
	}
	return teddies;
}
function addTeddy(teddy) {
	const teddies = getTeddies();
	teddies.push(teddy);
	localStorage.setItem("teddies", JSON.stringify(teddies));
}

// Event : Add a teddy
document.querySelector("#order").addEventListener("click", (e) => {
	// prevent actual submit
	e.preventDefault();
	console.log(document.body);
	console.log(document.querySelector("h5"));
	const id = document.querySelector("#ref").innerText.substring(6);
	const image = document.querySelector("#imageUrl").src;
	const nom = document.querySelector("h5").innerText;
	//const color = "green";
	const color = getColor();
	const price = Number(document.querySelector("#price").innerText);
	const nbArticles = Number(document.querySelector("#nbArticles").value);

	// validate
	showAlert("Teddy added", "success");
	// instatiate teddy
	const teddy = new Teddy(id, image, nom, color, price, nbArticles);
	console.log(teddy);
	// add teddy to store
	addTeddy(teddy);
	// on continue ?
	const modal = document.querySelector("#modal");
	modal.style.display = "block";
});
function getColor() {
	var selectValue = document.getElementById("choix-select").value;
	console.log("couleur " + selectValue);
	return selectValue;
}
