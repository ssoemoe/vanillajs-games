function init() {
  let player = 1;
  let winner = 0;
  let gameOn = true;
  let board = [];

  function checkWinner() {
    //check rows
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      if (board[rowIndex][0] === board[rowIndex][1] && board[rowIndex][1] === board[rowIndex][2] && board[rowIndex][0] !== 0) {
        winner = board[rowIndex][0];
        gameOn = false;
        return;
      }
    }

    //check cols
    for (let colIndex = 0; colIndex < 3; colIndex++) {
      if (board[0][colIndex] === board[1][colIndex] && board[1][colIndex] === board[2][colIndex] && board[0][colIndex] !== 0) {
        winner = board[0][colIndex];
        gameOn = false;
        return;
      }
    }

    //check diagonals
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[1][1] !== 0
      || board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[1][1] !== 0) {
      winner = board[1][1];
      gameOn = false;
      return;
    }

    //check draws
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      for (let colIndex = 0; colIndex < 3; colIndex++) {
        if (board[rowIndex][colIndex] === 0) {
          return;
        }
      }
    }

    gameOn = false;
    winner = 0;
    return;
  }

  function outputResults() {
    let result = document.getElementById("turn");
    if (winner > 0) {
      result.innerHTML = `<b>Player - ${winner} wins!</b>`;
    }
    else if (winner === 0) {
      result.innerHTML = `<b>Draw!</b>`;
    }
  }


  for (let row = 0; row < 3; row++) {
    let rowArray = [];
    for (let col = 0; col < 3; col++) {
      rowArray.push(0);

      // add listener
      document.getElementById(`td-${row}-${col}`).addEventListener("click", function () {
        let imgSrc = "";
        let turnDescription = ""
        if (gameOn) {
          if (board[row][col] !== 0) {
            return;
          }
          board[row][col] = player;
          if (player == 1) {
            imgSrc = "../media/circle.png";
            player = 2;
          }
          else {
            imgSrc = "../media/cross.jpg";
            player = 1;
          }
          document.getElementById(`img-${row}-${col}`).src = imgSrc;
          checkWinner();
          document.getElementById("turn").innerHTML = `Player ${player}'s turn`;
        }

        if (!gameOn) {
          outputResults();
        }
      });
    }
    board.push(rowArray);
  }
}

init();
