"use strict";

function init() {
  let players = [];
  let wrongWords = [];
  let gameword = "";
  let current_player = "";
  let playerWon = false;

  let drawHangman = mistakeIndex => {
    let canvas = document.getElementById("hangman");
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    switch (mistakeIndex) {
      case 0:
        ctx.rect(250, 250, 50, 30);
        break;
      case 1:
        ctx.moveTo(270, 250);
        ctx.lineTo(270, 10);
        break;
      case 2:
        ctx.moveTo(270, 10);
        ctx.lineTo(180, 10);
        break;
      case 3:
        ctx.moveTo(180, 10);
        ctx.lineTo(180, 50);
        break;
      case 4:
        ctx.arc(180, 70, 20, 0, 2 * Math.PI);
        break;
      case 5:
        ctx.moveTo(180, 90);
        ctx.lineTo(180, 150);
        break;
      case 6:
        ctx.moveTo(180, 90);
        ctx.lineTo(140, 100);
        break;
      case 7:
        ctx.moveTo(180, 90);
        ctx.lineTo(220, 100);
        break;
      case 8:
        ctx.moveTo(180, 150);
        ctx.lineTo(140, 170);
        break;
      case 9:
        ctx.moveTo(180, 150);
        ctx.lineTo(220, 170);
        break;
    }
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  let clearHangmanArea = _ => {
    //clear canvas
    let canvas = document.getElementById("hangman");
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  let resetGame = _ => {
    gameword = "";
    current_player = "";
    playerWon = false;
    wrongWords = [];
    clearHangmanArea();
  };

  let displayInputs = _ => {
    let inputHTML = `
      <h3>
        Game Word:
        <input id="gameword" placeholder="Type the game word" type="text" />
      </h3>
      <h3>
        Player Name:
        <input id="playername" placeholder="Type player name" type="text" />
      </h3>
      <button id="play-btn">Play</button>
      `;
    document.getElementById("game-details").innerHTML = inputHTML;
  };

  let alphabetBtnClick = alphabet => {};

  document.onkeypress = event => {
    // checks if the keycode is alphabet and gameword is already set
    if (event.keyCode >= 65 && event.keyCode <= 122 && gameword !== "") {
      alphabetBtnClick(String.fromCharCode(event.keyCode).toUpperCase());
    }
  };

  let displayGameboard = _ => {
    let gameDetails = document.getElementById("game-details");
    gameDetails.innerHTML = "";
    let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let gameboard = document.createElement("div");
    gameboard.id = "gameboard";
    for (let i = 0; i < alphabets.length; i += 5) {
      let newBtnDiv = document.createElement("div");
      for (let j = i; j < i + 4; j++) {
        if (!alphabets[j]) {
          break;
        }
        let alphabetBtn = document.createElement("button");
        alphabetBtn.innerText = alphabets[j];
        alphabetBtn.className = "alphabetBtn";
        alphabetBtn.id = alphabets[j];
        alphabetBtn.addEventListener("click", function() {
          alphabetBtnClick(alphabets[j]);
        });
        newBtnDiv.appendChild(alphabetBtn);
      }
      gameboard.appendChild(newBtnDiv);
    }
    gameDetails.appendChild(gameboard);
  };

  displayInputs();
  // show the hangman initially
  for (let i = 0; i < 10; i++) {
    drawHangman(i);
  }

  // add event listeners
  let playBtn = document.getElementById("play-btn");
  playBtn.addEventListener("click", function() {
    gameword = document.getElementById("gameword").value;
    current_player = document.getElementById("playername").value;

    if (gameword.trim() === "" || current_player.trim() === "") {
      alert("Gameword or playername cannot be empty");
      return;
    }
    clearHangmanArea();
    displayGameboard();
    gameword = gameword.toUpperCase();
    console.log(gameword);
  });
}

init();
