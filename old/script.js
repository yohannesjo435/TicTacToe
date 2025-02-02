let gameboard = {
  row1: ["", "", ""],
  row2: ["", "", ""],
  row3: ["", "", ""]
};

let markedBoard = [
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

let win = false;
let stopGame = false;
let player = "X";

function displayBoard() {
  console.log("      col1, col2, col3");
  for (i in gameboard) {
    console.log(i, ":", gameboard[i].join("  |  "));
  }
}

function promptAvalue() {
  let chosenRow = parseInt(prompt("Please Insert row(1-3): "));
  let chosenColumn = parseInt(prompt("Enter a column (1-3)"));
  return [chosenRow, chosenColumn];
}

function insertValue(chosenRow, chosenColumn, player) {
  if (chosenRow > 0 && chosenRow <= 3 && chosenColumn > 0 && chosenColumn <= 3) {
    chosenColumn -= 1; // Adjust for zero-based index

    if (gameboard[`row${chosenRow}`][chosenColumn] !== "") {
      console.log("Cell already occupied");
      return false; // Move was not successful
    } else {
      gameboard[`row${chosenRow}`][chosenColumn] = player;
      markedBoard[chosenRow][chosenColumn] = player;
      displayBoard();
      return true; // Move was successful
    }
  } else if (Number.isNaN(chosenRow) || Number.isNaN(chosenColumn)) {
    console.log("Invalid input");
    return false; // Invalid input
  }
  console.log("Marked board", markedBoard)
}

function playGame() {
  win = false;
  stopGame = false;

  while (!win && !stopGame) {
    const [chosenRow, chosenColumn] = promptAvalue();
    const validMove = insertValue(chosenRow, chosenColumn, player);

    if (validMove) { // Only call computerPlay if the player's move was valid
      checkWin(gameboard);
      if (!win) {
        computerPlay(); // Computer plays only after a valid player move
        checkWin(gameboard);
      }
    }
  }

  console.log(win ? `${player} wins!` : "Game Over");
}

function convertBoardToFlatArray(gameboard) {
  const rows = Object.values(gameboard);
  return [].concat(...rows);
}

function checkWin(gameboard) {
  const flatGameBoard = convertBoardToFlatArray(gameboard);
  for (let condition of winCondition) {
    if (condition.every(index => flatGameBoard[index] === "X" || flatGameBoard[index] === "O")) {
      win = true;
      // stopGame = true
      break; // Stop checking once a win is found
    }
    if(win){
      gameboard = {
        row1: ["", "", ""],
        row2: ["", "", ""],
        row3: ["", "", ""]
      };
    }
  }
}

function computerPlay() {
  let randomRow;
  let randomColumn;
  let validMove = false;

  while (!validMove) {
    randomRow = Math.floor(Math.random() * 3) + 1;
    randomColumn = Math.floor(Math.random() * 3) + 1;

    validMove = insertValue(randomRow, randomColumn, "O"); // Try to make a move
  }
}

displayBoard();
// playGame();