gameboard = (function () {
  rows = 3;
  columns = 3;
  board = [];
  for (i = 0; i < rows; i++) {
    board[i] = [];
    for (j = 0; j < columns; j++) {
      board[i][j] = undefined;
      board[i].push(tile());
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
  const checkerBoard = () => {
    let threeInRow = false;
    for (i = 0; i < board.length; i++) {
      for (j = 0; j < board[i].length - 2; j++) {
        board[i][j] == board[i][j + 1] && board[i][j] == board[i][j + 2] ? threeInRow = true : false
      }
    }
  }
  return { getBoard, addMark, printBoard, checkerBoard };
})();

gameboard.addMark(0,0,'x')
gameboard.addMark(0,1,'o')
gameboard.addMark(0,2,'x')
gameboard.addMark(1,0,'x')
gameboard.addMark(1,1,'o')
gameboard.addMark(1,2,'x')
gameboard.addMark(2,0,'x')
gameboard.addMark(2,1,'o')
gameboard.addMark(2,2,'x')
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
