const gameboard = ((size) => {
  const board = [];

  const reset = () => (board = Array(size).fill(Array(size).fill(None)));

  const markSpot = (x, y, symbol) => (board[x][y] = symbol);

  const checkLines = () => {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size - 1; col++) {
        if (board[col][row] != board[col + 1][row]) {
          break;
        }
        if (col == size - 1) {
          return true;
        }
      }
    }
    return false;
  };
  const checkColumns = () => {
    return board.some((col) =>
      col.every((symbol, _i, col) => symbol == col[0])
    );
  };

  const checkWin = () => {
    return checkLines() || checkColumns();
  };

  return { markSpot, checkWin, reset };
})();

export { gameboard };
