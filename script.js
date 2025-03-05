gameboard = (function () {
  rows = 3;
  columns = 3;

  let board = [];

  for (i = 0; i < rows; i++) {
    board[i] = [];
    for (j = 0; j < columns; j++) {
      board[i][j] = undefined;
    }
  }

  const getBoard = () => console.log(board);

  const addMark = (row, column, mark) => {
    if (board[row][column] === undefined) {
      board[row][column] = mark;
    } else {
      return;
    }
  };

  //need to check, returns true right away
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

  return { getBoard, addMark, checkerBoard };
})();

player = function (name, mark) {
  let playerName = name;
  let playerMark = mark;
  let playerScore = 0;
  const getPlayerName = () => playerName;
  const getPlayerMark = () => playerMark;
  const getPlayerScore = () => playerScore;
  const addPlayerScore = () => (playerScore += 1);
  return { getPlayerName, getPlayerMark, getPlayerScore, addPlayerScore };
};

const gameStart = {
  dialog: document.querySelector('#gamestart-dialog'),
  form: document.querySelector('#gamestart-form'),
  startButton: document.querySelector('#gamestart-button'),
  player1Name: '',
  player2Name: '',

  initialize() {
    this.startButton.addEventListener('click', () => this.showDialog())
    this.form.addEventListener('submit', (event) => this.handleSubmit(event))
  },
  showDialog() {
    this.dialog.style.display = 'block'
  },
  handleSubmit(event) {
    event.preventDefault()   
    let formData = new FormData(this.form)
    player1Name = formData.get('player1-name')
    player2name = formData.get('player2-name')
    this.dialog.style.display = 'none'
  },
  getPlayerNames() {
    return {
      player1: this.player1Name,
      player2: this.player2Name
    }
  }
}

function gameController() {
  const board = gameboard;

  gameStart.initialize()

  //save in variables
  player1Info = gameStart.getPlayerNames.player1;
  player2Info = gameStart.getPlayerNames.player2;

  //creates the player object
  const playerList = [
    (player1 = player(player1Info, "X")),
    (player2 = player(player2Info, "O")),
  ];

  let random01 = Math.floor(Math.random() * 2); //add random 0-1 for first turn

  let activePlayer = playerList[random01];

  //switches the active player
  const switchPlayerTurn = () => {
    activePlayer =
      activePlayer === playerList[0] ? playerList[1] : playerList[0];
  };

  let gameTiles = document.querySelectorAll('.game-tile')

  gameTiles.forEach((tile) => {
    tile.addEventListener('click', function() {
      isWin = false
      row = tile.dataset.row
      column = tile.dataset.column
      tile.textContent = activePlayer.getPlayerMark()
      board.addMark(row, column, activePlayer.getPlayerMark());
      switchPlayerTurn();
      board.getBoard() // only for testing        
      isWin = board.checkerBoard(); 
      if (isWin) {
        alert(`${activePlayer.getPlayerName()} won. Hurray`) //fix, undefined on the name
      } else {
        activePlayer === playerList[0] ? playerList[1] : playerList[0];
      }
    })
  })
}

gameController()

//button factory, create new button with click listener, and function to do
function newButton(selector, func) {
  const button = document.querySelector(selector);
  const removeListener = () => button.removeListener("click", clickHandler());
  button.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("click");
    func();
  });
  return {
    button,
    removeListener,
  };
}