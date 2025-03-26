//The main function, operates the virtual board
gameboard = (function () {
  let rows = 3;
  let columns = 3;

  let board = [];

  for (i = 0; i < rows; i++) {
    board[i] = [];
    for (j = 0; j < columns; j++) {
      board[i][j] = undefined;
    }
  }

  const getBoard = () => console.log(board); //prone to delete

  const addMark = (row, column, mark) => {
    if (board[row][column] === undefined) {
      board[row][column] = mark;
    } else {
      return;
    }
  };

  //checks in every array to find if there is a 3 in row, column or cross
  const checkerBoard = () => {
    let threeInRow = false;
    for (i = 0; i < board.length; i++) {
      for (j = 0; j < board[i].length - 2; j++) {
        if (board[i][j] !== undefined) {
          if (
            board[i][j] == board[i][j + 1] &&
            board[i][j] == board[i][j + 2]
          ) {
            threeInRow = true;
            break;
          } else {
            continue;
          }
        } else {
          break;
        }
      }
    }

    let threeInColumn = false;
    for (i = 0; i < board.length; i++) {
      for (j = 0; j < board[j].length - 2; j++) {
        if (board[j][i] !== undefined) {
          if (
            board[j][i] == board[j + 1][i] &&
            board[j][i] == board[j + 2][i]
          ) {
            threeInColumn = true;
            break;
          } else {
            continue;
          }
        } else {
          break;
        }
      }
    }

    let threeInCross = false;
    if (
      //checks if the threeInCross elements have an undefined
      [board[0][0], board[1][1], board[2][2]].every((el) => el !== undefined)
    ) {
      if (board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
        threeInCross = true;
      }
    }

    if (
      [board[0][2], board[1][1], board[2][0]].every((el) => el !== undefined)
    ) {
      if (board[0][2] == board[1][1] && board[0][2] == board[2][0]) {
        threeInCross = true;
      }
    }

    if (threeInRow || threeInColumn || threeInCross) {
      return true;
    } else {
      return false;
    }
  };

  const resetBoard = () => {
    for (i = 0; i < rows; i++) {
      for (j = 0; j < columns; j++) {
        board[i][j] = undefined;
      }
    }
  };

  return { getBoard, addMark, checkerBoard, resetBoard };
})();

//creates the player obj
player = function (name, mark, num) {
  let playerName = name;
  let playerMark = mark;
  let playerScore = 0;
  let playerStat = document.querySelector(`#player${num}-stats`);
  const getPlayerName = () => playerName;
  const getPlayerMark = () => playerMark;
  const getPlayerScore = () => playerScore;
  const addPlayerScore = () => (playerScore += 1);
  const highlightStats = () => {
    playerStat.style.backgroundColor = "var(--green-light)";
  };
  const noHighlightStats = () => {
    playerStat.style.backgroundColor = "";
  };
  return {
    getPlayerName,
    getPlayerMark,
    getPlayerScore,
    addPlayerScore,
    highlightStats,
    noHighlightStats,
  };
};

//responsible of the initial dialog and start the game
const gameStart = {
  dialog: document.querySelector("#gamestart-dialog"),
  form: document.querySelector("#gamestart-form"),
  startButton: document.querySelector("#gamestart-button"),

  initialize() {
    this.startButton.addEventListener("click", () => this.showDialog());
    this.form.addEventListener("submit", (event) => this.handleSubmit(event));
  },
  showDialog() {
    this.dialog.style.display = "block";
  },
  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData(this.form);
    let player1Name = formData.get("player1-name");
    let player2Name = formData.get("player2-name");
    let roundNumber = formData.get("round-number")
    this.dialog.style.display = "none";
    gameController(player1Name, player2Name, roundNumber);
  },
};

gameStart.initialize();

//controls the flow of each round
function roundController(board, gameTiles, playerList) {
  return new Promise((resolve) => {
    let round = 0;
    let activePlayer;

    //switches the active player
    const switchPlayerTurn = () => {
      activePlayer =
        activePlayer === playerList[0] ? playerList[1] : playerList[0];
    };

    //removes the click event listener on the tiles
    function removeClickHandler(tiles, func) {
      tiles.forEach((tile) => {
        tile.removeEventListener("click", func);
      });
    }

    let random01 = Math.floor(Math.random() * 2); //add random 0-1 for first turn

    activePlayer = playerList[random01];

    roundPopup("start", activePlayer.getPlayerName());

    activePlayer.highlightStats();

    //main function in charge of the round flow
    function clickHandler(event) {
      let tile = event.target;
      let isWin = false;
      let activePlayerName = activePlayer.getPlayerName();
      let activePlayerMark = activePlayer.getPlayerMark();
      let row = tile.dataset.row;
      let column = tile.dataset.column;
      tile.style.cursor = "default";
      tile.textContent = activePlayerMark;
      board.addMark(row, column, activePlayerMark); //add to the virtual board
      isWin = board.checkerBoard();
      tile.removeEventListener("click", clickHandler); //removes the clickHandler to the individual tile
      round += 1;
      activePlayer.noHighlightStats();
      if (isWin) {
        roundPopup("roundWinner", activePlayerName);
        setTimeout(() => {
          removeClickHandler(gameTiles, clickHandler);
          resolve(activePlayer);
        }, 1500);
      } else if (round >= 9) {
        roundPopup("draw", activePlayerName);
        setTimeout(() => {
          removeClickHandler(gameTiles, clickHandler);
          resolve(undefined);
        }, 1500);
      } else {
        switchPlayerTurn(); //switches activePlayer in each round
        activePlayer.highlightStats();
      }
    }

    gameTiles.forEach((tile) => {
      tile.addEventListener("click", clickHandler); //adds the event listeners to the tiles
      tile.style.cursor = "pointer";
    });
  });
}

async function gameController(player1Name, player2Name, roundNumber) {
  const board = gameboard;

  //creates the player object
  const playerList = [
    (player1 = player(player1Name, "X", 1)),
    (player2 = player(player2Name, "O", 2)),
  ];

  let gameTiles = document.querySelectorAll(".game-tile");

  boardClear(board, gameTiles);

  async function gameLoop() {
    for (let i = 0; i < roundNumber; i++) {
      playerStatManager(player1, player2);
      let winner = await roundController(board, gameTiles, playerList);
      if (winner) {
        winner.addPlayerScore();
      }

      boardClear(board, gameTiles);
    }
  }

  await gameLoop();

  let player1Score = player1.getPlayerScore();
  let player2Score = player2.getPlayerScore();

  let startButton = document.querySelector('#gamestart-button')

  if (player1Score == player2Score) {
    roundPopup("draw", player1Name);
  } else if (player1Score > player2Score) {
    roundPopup("gameWinner", player1Name);
    startButton.disabled = false;
  } else {
    roundPopup("gameWinner", player2Name);
  }

  gameReset(gameTiles)
}

//displays a popup depending on the action
function roundPopup(action, activePlayer) {
  let popup = document.querySelector("#round-popup");

  popup.style.display = "flex";

  switch (action) {
    case "start":
      popup.innerHTML = `The game started, It's ${activePlayer} turn`;
      break;
    case "roundWinner":
      popup.innerHTML = `Round won by ${activePlayer}!`;
      break;
    case "draw":
      popup.innerHTML = "There is a draw!";
      break;
    case "gameWinner":
      popup.innerHTML = `The game has ended, ${activePlayer} is the winner!!!`;
      break;
  }

  //disappear after 2 seconds
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

function boardClear(board, UIBoard) {
  UIBoard.forEach((tile) => {
    tile.innerHTML = "";
  });

  board.resetBoard();
}

function playerStatManager(player1, player2) {
  let player1Stats = document.querySelector("#player1-stats");
  let player2Stats = document.querySelector("#player2-stats");
  player1Stats.innerHTML = `${player1.getPlayerName()}: ${player1.getPlayerMark()}    Score: ${player1.getPlayerScore()}`;
  player2Stats.innerHTML = `${player2.getPlayerName()}: ${player2.getPlayerMark()}    Score: ${player2.getPlayerScore()}`;
}

function gameReset(gameTiles) {
  let player1Stats = document.querySelector('#player1-stats')
  let player2Stats = document.querySelector('#player2-stats')
  player1Stats.style.backgroundColor = ''
  player2Stats.style.backgroundColor = ''
  player1Stats.innerHTML = ''
  player2Stats.innerHTML = ''
  gameTiles.innerHTML = ''
}