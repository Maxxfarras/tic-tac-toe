gameboard = (function () {
  rows = 3;
  columns = 3;
  board = [];
  for (i = 0; i < rows; i++) {
    board[i] = [];
    for (j = 0; j < columns; j++) {
      board[i].push(tile());
    }
  }
  const getBoard = () => board;
  return { board, getBoard };
})();

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
