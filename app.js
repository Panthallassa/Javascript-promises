// Using Javascript Promises

// Part 1: Number Facts

// Step 1:

const favouriteNumber = 30;
const url = `http://numbersapi.com/${favouriteNumber}?json`;

function getNumberFact(url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", url);
		xhr.responseType = "json";

		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				resolve(xhr.response);
			} else {
				reject(
					new Error(
						`Request failed with status ${xhr.status}`
					)
				);
			}
		};

		xhr.onerror = () => {
			reject(new Error("Network error"));
		};

		xhr.send();
	});
}

getNumberFact(url)
	.then((response) => {
		console.log(
			`Here is a fact on #${favouriteNumber}:`,
			response.text
		);
	})
	.catch((error) => {
		console.error("Error:", error);
	});

// Step 2:

const numbers = [10, 20, 30];
const url2 = `http://numbersapi.com/${numbers.join(
	","
)}?json`;

function getNumberFacts(url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", url);
		xhr.responseType = "json";

		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				resolve(xhr.response);
			} else {
				reject(
					new Error(
						`Request failed with status ${xhr.status}`
					)
				);
			}
		};

		xhr.onerror = () => {
			reject(new Error("Network Error"));
		};

		xhr.send();
	});
}

getNumberFacts(url2)
	.then((response) => {
		const numberFactsDiv =
			document.getElementById("number-facts");
		for (const [number, fact] of Object.entries(response)) {
			const p = document.createElement("p");
			p.textContent = `- ${fact}`;
			numberFactsDiv.appendChild(p);
		}
	})
	.catch((error) => {
		console.error("Error:", error);
	});

// Step 3:

const numberOfFacts = 4;
const urls = Array.from(
	{ length: numberOfFacts },
	() => `http://numbersapi.com/${favouriteNumber}?json`
);

function getNumberFact(url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", url);
		xhr.responseType = "json";

		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				resolve(xhr.response);
			} else {
				reject(
					new Error(
						`Request failed with status ${xhr.status}`
					)
				);
			}
		};
		xhr.onerror = () => {
			reject(new Error("Network error"));
		};

		xhr.send();
	});
}

Promise.all(urls.map((url) => getNumberFacts(url)))
	.then((responses) => {
		const factsDiv = document.getElementById(
			"favourite-number-facts"
		);
		responses.forEach((response, index) => {
			const p = document.createElement("p");
			p.textContent = `Fact ${
				index + 1
			} about number ${favouriteNumber}: ${response.text}`;
			factsDiv.appendChild(p);
		});
	})
	.catch((error) => {
		console.error("Error:", error);
	});

// Part 2: Deck of Cards

// Part 1:
function fetchSingleCard() {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(
			"GET",
			"https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
		);
		xhr.responseType = "json";

		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				resolve(xhr.response);
			} else {
				reject(
					new Error(
						`Request failed with status ${xhr.status}`
					)
				);
			}
		};

		xhr.onerror = () => {
			reject(new Error("Network error"));
		};
		xhr.send();
	});
}

// Part 2
function fetchAnotherCard(deckId) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(
			"GET",
			`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
		);
		xhr.responseType = "json";

		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				resolve(xhr.response);
			} else {
				reject(
					new Error(
						`Request failed with status ${xhr.status}`
					)
				);
			}
		};

		xhr.onerror = () => {
			reject(new Error("Network error"));
		};

		xhr.send();
	});
}

fetchSingleCard()
	.then((response) => {
		const deckId = response.deck_id;
		console.log(
			`First card: ${response.cards[0].value} of ${response.cards[0].suit}`
		);
		return fetchAnotherCard(deckId);
	})
	.then((response) => {
		console.log(
			`Second card: ${response.cards[0].value} of ${response.cards[0].suit}`
		);
	})
	.catch((error) => {
		console.error("Error:", error);
	});

// Part 3:

let deckId;
const drawCardButton = document.getElementById(
	"draw-card-button"
);
const cardsContainer = document.getElementById(
	"cards-container"
);

function createNewDeck() {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(
			"GET",
			"https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
		);
		xhr.responseType = "json";

		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				resolve(xhr.response);
			} else {
				reject(
					new Error(
						`Request failed with status ${xhr.status}`
					)
				);
			}
		};

		xhr.onerror = () => {
			reject(new Error("Network error"));
		};

		xhr.send();
	});
}

function drawCard(deckId) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(
			"GET",
			`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
		);
		xhr.responseType = "json";

		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				resolve(xhr.response);
			} else {
				reject(
					new Error(
						`Request failed with status ${xhr.status}`
					)
				);
			}
		};

		xhr.onerror = () => {
			reject(new Error("Network error"));
		};

		xhr.send();
	});
}

createNewDeck()
	.then((response) => {
		deckId = response.deck_id;
		drawCardButton.disabled = false;
	})
	.catch((error) => {
		console.error("Error creating deck:", error);
	});

drawCardButton.addEventListener("click", () => {
	drawCard(deckId)
		.then((response) => {
			if (response.success && response.cards.length > 0) {
				const card = response.cards[0];
				const cardDiv = document.createElement("div");
				cardDiv.classList.add("card");
				cardDiv.innerHTML = `<img src="${card.image}" alt="${card.value} of ${card.suit}">`;
				cardsContainer.appendChild(cardDiv);

				if (response.remaining === 0) {
					drawCardButton.disabled = true;
					drawCardButton.textContent = "No more cards left";
				}
			} else {
				drawCardButton.disabled = true;
				drawCardButton.textContent = "No more cards left";
			}
		})
		.catch((error) => {
			console.error("Error drawing card:", error);
		});
});
