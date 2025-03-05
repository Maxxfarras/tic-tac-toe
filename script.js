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

  const getBoard = () => board;

  const addMark = (row, column, mark) => {
    if (board[row][column] === undefined) {
      board[row][column] = mark;
    } else {
      return;
    }
  };

  const printBoard = () => {
    const boardWithValues = board.map((row) => row.map((tile) => tile));
    console.log(boardWithValues);
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

  return { getBoard, addMark, printBoard, checkerBoard };
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

function gameController() {
  const board = gameboard;

  //need to link on the gamestart dialog
  //save in variables
  player1Info = getPlayerInfo(1);
  player2Info = getPlayerInfo(2);

  //creates the player object
  const playerList = [
    (player1 = player(player1Info.name, "X")),
    (player2 = player(player2Info.name, "O")),
  ];

  let random01 = Math.floor(Math.random() * 2); //add random 0-1 for first turn

  let activePlayer = playerList[random01];

  //switches the active player
  const switchPlayerTurn = () => {
    activePlayer =
      activePlayer === playerList[0] ? playerList[1] : playerList[0];
  };

  const newRound = () => {
    let isWin = false;
    for (i = 0; i <= 9; i++) {
      printRound();
      row = input.getRowInput();
      column = input.getColumnInput();
      board.addMark(row, column, activePlayer.getPlayerMark());
      board.printBoard();
      switchPlayerTurn();
      isWin = board.checkerBoard();
      if (isWin) {
        activePlayer === playerList[0] ? playerList[1] : playerList[0];
        printWinner(activePlayer.getPlayerName());
        break;
      }
    }
  };

  let submitBtn = newButton("#submit-button", newRound);
}

//input object to retrieve info on the input box
input = (function inputTest() {
  //let rowInput = document.querySelector("#row");
  //let columnInput = document.querySelector("#column");

  //const getRowInput = () => rowInput.value;
  //const getColumnInput = () => columnInput.value;

  let gameTiles = document.querySelectorAll('.game-tile')
  let row
  let column
  gameTiles.forEach((tile) => {
    tile.addEventListener('click', function() {
      row = tile.dataset.row
      column = tile.dataset.row
    })
  })

  const getRowInput = () => row;
  const getColumnInput = () => column;

  return {
    getRowInput,
    getColumnInput,
  };
})();

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


function DOMHandler() {
  let gameTiles = document.querySelectorAll('.game-tile')
  gameTiles.forEach((tile) => {
    tile.addEventListener('click', function() {
      console.log(tile.dataset.row)
      console.log(tile.dataset.column)
    })
  })
}

const gameStart = {
  dialog: document.querySelector('#gamestart-dialog'),
  form: document.querySelector('#gamestart-form'),
  startButton: document.querySelector('#gamestart-button'),

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
    let player1Name = formData.get('player1-name')
    let player2name = formData.get('player2-name')
    this.dialog.style.display = 'none'
    return {
      player1Name,
      player2name
    }
  }
  
}

gameStart.initialize()

//DOMHandler()
//not ready, just for testing
input.getRowInput()
input.getColumnInput()
//gameController();

