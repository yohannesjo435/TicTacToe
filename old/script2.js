let gameboard = [
    "", "", "",
    "", "", "",
    "", "", ""
]


let winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = "X";
let running = false

const cells = document.querySelectorAll(".cell")
const container = document.querySelector(".container")
const statusText = document.querySelector(".statusText")

function playeGame(){
  cells.forEach((cell)=> {
    cell.addEventListener("click", cellClicked)
  })
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex")

  if (gameboard[cellIndex] != "" || !running){
    return;
  }
  updateCell(this, cellIndex)
  checkWinner()
}

function updateCell(cell, cellIndex) {
  gameboard[cellIndex] = currentPlayer
  cell.textContent = currentPlayer;
}
function changePlayer() {
  currentPlayer = (currentPlayer === "X")? "O": "X";
  statusText.textContent = currentPlayer 
}
function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winCondition.length; i++) {
    const condition = winCondition[i]//[3,4,5]
    const cellA = gameboard[condition[0]]//3 postion
    const cellB = gameboard[condition[1]]//4 postion
    const cellC = gameboard[condition[2]]//5 postion

    if (cellA === "" || cellB === "" || cellC === ""){
      continue;
    }
    if (cellA === cellB && cellA === cellC) {
      roundWon = true
      break;
    }
  }

  if(roundWon){
    statusText.innerText = `${currentPlayer} Wins` 
    running = false
  }else if (!gameboard.includes("")){
    statusText.innerText = "It's a tie"
    running = false
  }else {
    changePlayer()
  }

}

// function restartGame() {
//   currentPlayer = "X"
//   gameboard = ["", "", "", "", "", "", "", "", ""]
//   statusText.innerText = `${currentPlayer} Turns` 
//   cells.forEach(cell => cell.innerText = "")
//   running = true
// }

playeGame()