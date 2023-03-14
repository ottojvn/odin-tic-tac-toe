const gameboard = (() => {
  let board = [];

  const setPos = (x, y, symbol) => (board[x][y] = symbol);

  const getPos = (x, y) => board[x][y];

  const reset = (size) => (board = Array(size).fill(Array(size).fill(null)));

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

  return { setPos, getPos, reset, checkWin };
})();

export { gameboard };
