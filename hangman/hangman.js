"use strict";

function init() {
  let players = [];
  let wrongWords = [];
  let correctWords = [];
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
    wrongWords = [];
    correctWords = [];
    gameword = "";
    current_player = "";
    playerWon = false;
  };

  let displayInputs = _ => {
    // show the hangman initially
    for (let i = 0; i < 10; i++) {
      drawHangman(i);
    }
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

    let playBtn = document.getElementById("play-btn");
    playBtn.addEventListener("click", function() {
      gameword = document.getElementById("gameword").value;
      current_player = document.getElementById("playername").value.trim();

      if (gameword.trim() === "" || current_player.trim() === "") {
        alert("Gameword or playername cannot be empty");
        return;
      }
      clearHangmanArea();
      gameword = gameword.toUpperCase();
      console.log(gameword);
      displayGameboard();
      let player = players.find(p => p.name === current_player);
      if (!player) {
        players.push({
          name: current_player,
          score: 0,
          numGames: 1,
          word: gameword
        });
      } else {
        player.numGames++;
        player.word = gameword;
      }
    });
  };

  let finalizeGame = _ => {
    let leaderboardBody = document
      .getElementById("leaderboard")
      .getElementsByTagName("tbody")[0];
    let player = players.find(p => p.name === current_player);
    let gameDetails = document.getElementById("game-details");
    gameDetails.innerHTML = "";
    if (playerWon) {
      player.score++;
      gameDetails.innerHTML = `<strong>${current_player}</strong> won!<br>`;
    } else {
      gameDetails.innerHTML = `<strong>${current_player}</strong> lost!<br>`;
    }
    gameDetails.innerHTML += `Current score of ${player.name}: ${player.score}<br>`;
    gameDetails.innerHTML += `<button id="restart-btn">New Game</button>`;
    document
      .getElementById("restart-btn")
      .addEventListener("click", function() {
        displayInputs();
      });
    // draw leaderboard
    leaderboardBody.innerHTML = "";
    for (let p of players) {
      leaderboardBody.innerHTML += `<tr><td>${p.name}</td><td>${p.score}</td>
      <td>${p.numGames}</td><td>${p.word}</td></tr>`;
    }

    resetGame();
  };

  let alphabetBtnClick = alphabet => {
    let correctWordsIncludes = correctWords.includes(alphabet);
    if (gameword.includes(alphabet) && !correctWordsIncludes) {
      for (let i = 0; i < gameword.length; i++) {
        if (gameword[i] === alphabet) {
          let missingWord = document.getElementById(`missing-word-${i}`);
          missingWord.innerText = alphabet;
          correctWords.push(alphabet);
        }
      }
      document.getElementById(`id-${alphabet}`).style.backgroundColor = "green";
      document.getElementById(`id-${alphabet}`).style.color = "white";
      // checks if the player wins
      if (correctWords.length === gameword.length) {
        playerWon = true;
        finalizeGame();
      }
    } else if (!correctWordsIncludes) {
      if (wrongWords.includes(alphabet)) {
        return;
      }
      wrongWords.push(alphabet);
      drawHangman(wrongWords.length - 1);
      document.getElementById(`id-${alphabet}`).style.backgroundColor = "red";
      document.getElementById(`id-${alphabet}`).style.color = "white";
      if (wrongWords.length === 10) {
        playerWon = false;
        finalizeGame();
      }
    }
  };

  document.onkeypress = event => {
    // checks if the keycode is alphabet and gameword is already set
    if (event.keyCode >= 65 && event.keyCode <= 122 && gameword !== "") {
      alphabetBtnClick(String.fromCharCode(event.keyCode).toUpperCase());
    }
  };

  let displayGameboard = _ => {
    let gameDetails = document.getElementById("game-details");
    gameDetails.innerHTML = "";

    // set up the game word
    let gamewordDiv = document.createElement("div");
    for (let i = 0; i < gameword.length; i++) {
      let missingWord = document.createElement("span");
      missingWord.id = `missing-word-${i}`;
      missingWord.className = "missingWord";
      missingWord.innerText = "-";
      gamewordDiv.appendChild(missingWord);
    }

    gameDetails.appendChild(gamewordDiv);

    // set up alphabet keyboard
    let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let gameboard = document.createElement("div");
    gameboard.id = "gameboard";
    for (let i = 0; i < alphabets.length; i += 5) {
      let newBtnDiv = document.createElement("div");
      for (let j = i; j < i + 5; j++) {
        if (!alphabets[j]) {
          break;
        }
        let alphabetBtn = document.createElement("button");
        alphabetBtn.innerText = alphabets[j];
        alphabetBtn.className = "alphabetBtn";
        alphabetBtn.id = `id-${alphabets[j].toUpperCase()}`;
        alphabetBtn.addEventListener("click", function() {
          alphabetBtnClick(alphabets[j].toUpperCase());
        });
        newBtnDiv.appendChild(alphabetBtn);
      }
      gameboard.appendChild(newBtnDiv);
    }
    gameDetails.appendChild(gameboard);
  };

  displayInputs();
}

init();
