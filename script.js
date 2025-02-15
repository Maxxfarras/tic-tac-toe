gameboard = (function () {
  rows = 3;
  columns = 3;
  
  board = [];
  for (i = 0; i < rows; i++) { //fix this, makes 4 arrays
    board[i] = [];
    for (j = 0; j < columns; j++) {
      board[i][j] = ''; //need to work on the empty array
      board[i].push(tile());
    }
  }

  const getBoard = () => board;

  const addMark = (row, column, mark) => {
    if (board[row][column] === '.') {
      board[row][column] = mark;
    } else {
      return;
    }
  };

  const printBoard = () => {
    const boardWithValues = board.map((row) => row.map((tile) => tile));
    console.log(boardWithValues);
  };
//need to work on this, need to avoid to detect the .
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

  //prompts for player info, returns object name, mark
  const getPlayerInfo = (playerNum) => {
    let name = prompt(`Enter player ${playerNum} name`);
    return { name: name };
  };

  //save in variables
  player1Info = getPlayerInfo(1);
  player2Info = getPlayerInfo(2);

  //creates the player object
  const playerList = [
    (player1 = player(player1Info.name, 'X')),
    (player2 = player(player2Info.name, 'O')),
  ];

  let random01 = Math.floor(Math.random() * 2) //add random 0-1 for first turn

  let activePlayer = playerList[random01]

  //switches the active player
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === playerList[0] ? playerList[1] : playerList[0];
  }

  //prints the current state of the board, print current turn 
  const printRound = () => {
    console.log(`Its ${activePlayer.getPlayerName()}'s turn!`)
    board.printBoard()
  }

  const printWinner = (player) => {
    console.log(`The game has ended, ${player} is the winner!!`)
  }

  const newRound = () => {
    printRound()
    row = prompt('Row?')
    column = prompt('Column?')
    board.addMark(row, column, activePlayer.getPlayerMark())
    isWin = board.checkerBoard()
    if (isWin) {
      printWinner(activePlayer.getPlayerName())
      return
    }
    switchPlayerTurn()
  }
  newRound()
}

gameController();
