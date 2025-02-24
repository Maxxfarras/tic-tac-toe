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

/*
//this whole function prone to delete
needed for the push(), but it is not necessary any more

function tile() {
  let value = 0;
  const getValue = () => value;
  const changeValue = (mark) => (value = mark);
  return {
    getValue,
    changeValue,
  };
}
*/

function gameController() {
  const board = gameboard; //prone to change

  //prompts for player info, returns object name
  const getPlayerInfo = (playerNum) => {
    let name = prompt(`Enter player ${playerNum} name`);
    return { name: name };
  };

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

  //prints the current state of the board, print current turn
  const printRound = () => {
    console.log(`Its ${activePlayer.getPlayerName()}'s turn!`);
    board.printBoard();
  };

  const printWinner = (player) => {
    console.log(`The game has ended, ${player} is the winner!!`);
  };

  const clearTerminal = () => {
    console.clear();
  };

  const newRound = () => {
    let isWin = false;
    for (i = 0; i <= 9; i++) {
      clearTerminal();
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

input = (function inputTest() {
  let rowInput = document.querySelector("#row");
  let columnInput = document.querySelector("#column");

  const getRowInput = () => rowInput.value;
  const getColumnInput = () => columnInput.value;
  return {
    getRowInput,
    getColumnInput,
  };
})();

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

gameController();
