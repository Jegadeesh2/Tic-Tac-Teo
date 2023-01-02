//Elements

const cellsEle = document.querySelectorAll(".cell");
const displayEle = document.querySelector("#display");
const resetEle = document.querySelector("#reset-btn");
const conditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Global Variables

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

//Functions
start();
function start() {
  cellsEle.forEach((cell) => cell.addEventListener("click", select));
  resetEle.addEventListener("click", restart);
  running = true;
}

function select() {
  const selected = this.getAttribute("id");
  if (options[selected] != "" || !running) {
    return;
  }
  update(this, selected);
  check();
}

function update(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  displayEle.textContent = currentPlayer + ` 's Turn`;
}

function check() {
  let won = false;
  for (let i = 0; i < conditions.length; i++) {
    const condition = conditions[i];
    const conditionOne = options[condition[0]];
    const conditionTwo = options[condition[1]];
    const conditionThree = options[condition[2]];
    if (conditionOne === "" || conditionTwo === "" || conditionThree === "") {
      continue;
    }

    if (conditionOne === conditionTwo && conditionThree === conditionOne) {
      won = true;
      break;
    }
  }
  if (won) {
    displayEle.textContent = "Player " + `"${currentPlayer}"  Won..🎉`;
  } else if (!options.includes("")) {
    displayEle.textContent = "Draw..!";
  } else {
    changePlayer();
  }
}

function restart() {
  currentPlayer = "X";
  options = Array(9).fill("");
  cellsEle.forEach((cell) => (cell.innerText = ""));
  displayEle.textContent = "Start : X' s Turn ";
}
