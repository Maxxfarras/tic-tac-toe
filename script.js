gameboard = (function () {
  rows = 3;
  columns = 3;
  /*
  board = [];
  for (i = 0; i < rows; i++) {
    board[i] = [];
    for (j = 0; j < columns; j++) {
      board[i][j] = undefined;
      board[i].push(tile());
    }
  }
*/
  let board = [
    ["x", "o", "o"],
    ["x", "o", "x"],
    ["o", "p", "o"],
  ];

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

  const checkerBoard = () => {
    let threeInRow = false;
    for (i = 0; i < board.length; i++) {
      for (j = 0; j < board[i].length - 2; j++) {
        if (board[i][j] == board[i][j + 1] && board[i][j] == board[i][j + 2]) {
          threeInRow = true;
          break;
        } else {
          continue;
        }
      }
    }

    let threeInColumn = false;
    for (i = 0; i < board.length; i++) {
      for (j = 0; j < board[j].length - 2; j++) {
        if (board[j][i] == board[j + 1][i] && board[j][i] == board[j + 2][i]) {
          threeInColumn = true;
          break;
        } else {
          continue;
        }
      }
    }

    let threeInCross = false;
    if (board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
      threeInCross = true;
    }
    if (board[0][2] == board[1][1] && board[0][2] == board[2][0]) {
      threeInCross = true;
    }

    if (threeInRow || threeInColumn || threeInCross) {
      return "The game has ended";
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

function tile() {
  let value = 0;
  const getValue = () => value;
  const changeValue = (mark) => (value = mark);
  return {
    getValue,
    changeValue,
  };
}

function gameController() {
  const board = gameboard; //prone to change

  const getPlayerInfo = (playerNum) => {
    let name = prompt(`Enter player ${playerNum} name`);
    let mark = prompt(`Enter player ${playerNum} mark`);
    return { name: name, mark: mark };
  };

  player1Info = getPlayerInfo(1);
  player2Info = getPlayerInfo(2);

  const playerList = [
    (player1 = player(player1Info.name, player1Info.mark)),
    (player2 = player(player2Info.name, player2Info.mark)),
  ];

  let random01 = Math.floor(Math.random() * 2) //add random 0-1 for first turn

  let activePlayer = playerList[random01]

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === playerList[0] ? playerList[1] : playerList[0];
  }

  const getActivePlayer = () => activePlayer

  const printRound = () => {
    console.log(`Its ${getActivePlayer().name}'s turn!`) //undefined, need to check the object methods
    board.printBoard()
  }
  printRound()
}

gameController();
