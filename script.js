
const boardDisplayer = (() => {
  let gameboard = ["","","","","","","","",""]
  let player = {player1: "X", player2: "O"}
  let currentPlayer = player["player2"]//o
  let gameover = false
  
  let gameboardHTML = ``
  
  gameboard.forEach((cell, cellIndex)=> {
    gameboardHTML += `<div class="cell cell${cellIndex}" data-cell-id=${cellIndex}>${cell}</div>`
  })
  document.querySelector(".board").innerHTML = gameboardHTML

  
  document.querySelectorAll(".cell").forEach((cell)=> {
    const cellId = cell.getAttribute ("data-cell-id")
    cell.addEventListener("click", () => displayElement(cell, cellId))

  })
  return {gameboard, player, currentPlayer, gameover}
})()

const displayContollers = (() => {
  const restartBtn = document.querySelector(".restart")
  const statusDisplayer = document.querySelector(".statusDisplayer")
  // statusDisplayer.innerText = boardDisplayer.
  restartBtn.addEventListener("click", restartGame)
})()



function displayElement(cell, cellId) {
  if (!(boardDisplayer.gameover)){
    if(cell.innerText === ""){
      if (boardDisplayer.currentPlayer === "X") {
        boardDisplayer.currentPlayer = boardDisplayer.player["player2"]
      }else if (boardDisplayer.currentPlayer === "O"){
        boardDisplayer.currentPlayer = boardDisplayer.player["player1"]
      }
      cell.innerText = boardDisplayer.currentPlayer
    }else {
      console.log("The cell is occoupied choose another cell")
    }
    boardDisplayer.gameboard[cellId] = boardDisplayer.currentPlayer
    checkWinner(boardDisplayer.gameboard)
    // console.log(boardDisplayer.gameboard)
  }else {
    console.log("Game Over")
  }

}

function checkWinner(board) {
  // console.log(board)
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
    
  if(boardDisplayer.gameboard.every((value)=> value !== "")){
    console.log("it's a tie")
  }
  for (let i = 0; i < winCondition.length; i++ ){
    let [a, b, c] = winCondition[i]
    if (board[a] !== "" && board[b] !== "" && board[c]){
      if(board[a] === board[b] && board[c] === board[a]){
        console.log( `${board[a]} wins`)
        boardDisplayer.gameover = true
        break;
      }
    }
  }
}

function restartGame() {
  boardDisplayer.gameover = false
  boardDisplayer.gameboard = ["", "", "", "", "", "", "", "", ""];
  document.querySelectorAll(".cell").forEach((cell)=> {
    cell.innerText = "";
  })

}