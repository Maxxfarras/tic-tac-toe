gameboard = (function () {
    row1 = [0,1,2];
    row2 = [0,1,2];
    row3 = [0,1,2];
    return {row1, row2, row3}
})();

function player(name, mark) {
    let personalScore = 0;
    const getPersonalScore = () => personalScore;
    const addPersonalScore = () => personalScore += 1;
    return {name, mark, getPersonalScore, addPersonalScore}
}
