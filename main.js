const btnStart = document.querySelector(".start");
const btnReset = document.querySelector(".reset");
const lives = document.querySelector(".lives");
const points = document.querySelector(".points");
const time = document.querySelector(".time");
const squaresPalette = document.querySelector(".squares");
const alertPopup = document.querySelector(".alert");

let livesNumber = 1;
let pointsNumber = 0;
let timeInSeconds = 15;
let timeCounter = null;
let secondsCounter = null;
let numberOfSquares = 25;
let drawnNumber = 0;
let selectedSquare = 0;
let isAlertVisible = false;
let gameStarted = false;

createPaletteItems();

function createPaletteItems() {
  const items = [];
  let counter = 1;
  for (let i = 0; i < numberOfSquares; i++) {
    const item = document.createElement("button");
    item.type = "button";
    item.dataset.number = counter;
    item.classList.add("item");
    item.style.pointerEvents = "none";
    items.push(item);
    itemBtns = document.querySelectorAll(".item");
    counter++;
  }
  squaresPalette.append(...items);
  btnStart.disabled = false;
}

function selectSqare(event) {
  if (event.target.nodeName !== "BUTTON" || gameStarted === false) {
    return;
  }

  selectedSquare = event.target.dataset.number;
  console.log(`Selected square: ${selectedSquare}`);
  matchCheck();
}

function matchCheck() {
  if (drawnNumber == selectedSquare) {
    addPoint();
    clearInterval(timeCounter);
    displaySquare();
    setInterv();
  } else {
    gameOver();
  }
}

function gameOver() {
  const itemBtns = document.querySelectorAll(".item");
  livesNumber--;
  clearInterval(timeCounter);
  clearInterval(secondsCounter);
  lives.textContent = `Życia: ${livesNumber}`
  gameStarted = false;
  toggleAlertPopup();
  for (const item of itemBtns) {
    item.style.backgroundColor = "white";
    item.style.pointerEvents = "none";
  }
  btnStart.disabled = true;
  console.log("Koniec gry");
}

function setInterv() {
  timeCounter = setInterval(() => {
    gameOver();
  }, 1500);
}

function gameStart() {
  gameStarted = true;
  timeCounting();
  displaySquare();
  setInterv();
};

function displaySquare() {
  const itemBtns = document.querySelectorAll(".item");
  const previousDrawnNumber = drawnNumber;

  for (const item of itemBtns) {
    item.style.backgroundColor = "white";
    item.style.pointerEvents = "auto";
  }

  drawnNumber = Math.floor((Math.random() * numberOfSquares) + 1);

  for (let i = 0; i < numberOfSquares; i++) {
    if (drawnNumber === previousDrawnNumber) {
      drawnNumber = Math.floor((Math.random() * numberOfSquares) + 1);
      break;
    }
  }
  console.log(`Drawn number ${drawnNumber}`);
  itemBtns[drawnNumber - 1].style.backgroundColor = "green";
};

function gameReset() {
  isSquareClicked = false;
  livesNumber = 1;
  pointsNumber = 0;
  timeInSeconds = 15;
  btnStart.disabled = false;
  points.style.backgroundColor = "white";
  lives.textContent = `Życia: ${livesNumber}`;
  points.textContent = `Punkty: ${pointsNumber}`;
  time.textContent = `Czas: ${timeInSeconds} sek`;
  lives.style.backgroundColor = "lightgreen";
  const itemBtns = document.querySelectorAll(".item");
  for (const item of itemBtns) {
    item.style.backgroundColor = "white";
  }
}

squaresPalette.addEventListener("click", selectSqare);
btnStart.addEventListener("click", gameStart);
btnReset.addEventListener("click", gameReset);

function addPoint() {
  points.textContent = `Punkty: ${++pointsNumber}`
  if (pointsNumber > 4 && pointsNumber < 10) {
    points.style.backgroundColor = "yellow";
  } else if (pointsNumber > 9 && pointsNumber < 15) {
    points.style.backgroundColor = "orange";
  } else if (pointsNumber > 14 && pointsNumber < 20) {
    points.style.backgroundColor = "tomato";
  } else if (pointsNumber > 19 && pointsNumber < 40) {
    points.style.backgroundColor = "red";
  }
}

function timeCounting() {
  secondsCounter = setInterval(() => {
    time.textContent = `Czas: ${timeInSeconds--} sek`;
    if (timeInSeconds === -1) gameOver();
  }, 1000)
}

function toggleAlertPopup() {
  if (isAlertVisible) {
    return;
  }
  alertPopup.textContent = `KONIEC GRY!  ZDOBYTA ILOŚĆ PUNKTÓW: ${pointsNumber}`;
  isAlertVisible = true;
  alertPopup.classList.add("is-visible");
  isAlertVisible = false;
  btnReset.disabled = true;
  setTimeout(() => {
    btnReset.disabled = false;
    alertPopup.classList.remove("is-visible");
  }, 4000);
}

//można ewentualnie dodać:
//1.wybór ilości sekund gry
//2.wybór czasu oczekiwania na kliknięcie kwadratru
//3.wybór koloru wypełniającego kwadrat
//4.kwadraty będą wypełniane losowymi kolorami
//5.wyświetlanie najlepszego wyniku osiągniętego w danej sesji
//6.wybór ilości żyć

///////////////// wykorzystać w przypadku rozbudowy programu
function getRangomColor() {
  return `#${getRandomHex()}${getRandomHex()}${getRandomHex()}`;
}

function getRandomHex() {
  return Math.round(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
}
////////////////////////////////////////////////