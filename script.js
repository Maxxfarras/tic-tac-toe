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
  let board = [['x','x','o'],
               ['o','o','o'],
               ['o','x','x']]  
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
        board[i][j] == board[i][j + 1] && board[i][j] == board[i][j + 2] ? threeInRow = true: false
      }
    }
    let threeInColumn = false;
    for (i = 0; i < board.length; i++) {
      for (j = 0; j < board[j].length - 2; j++) {
        board[j][i] == board[j + 1][i] && board[j][i] == board[j + 2][i] ? threeInColumn = true : false
      }
    }
    let threeInCross = false;
    if (board[0][0] == board[1][1] && board[0][0] == board[2][2]) { //this code is trash but works
      threeInCross = true;
    }
    if (board[0][2] == board[1][1] && board[0][2] == board[2][0]) {
      threeInCross = true;
    }
  }
  return { getBoard, addMark, printBoard, checkerBoard };
})();

gameboard.checkerBoard()

function player(name, mark) {
  let personalScore = 0;
  const getPersonalScore = () => personalScore;
  const addPersonalScore = () => (personalScore += 1);
  return { name, mark, getPersonalScore, addPersonalScore };
}

function tile() {
  let value = 0;
  const getValue = () => value;
  const changeValue = (mark) => (value = mark);
  return {
    getValue,
    changeValue,
  };
}
