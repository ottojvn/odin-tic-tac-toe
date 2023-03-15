const gameboard = (() => {
  let board = [];

  const setPos = (x, y, symbol) => {
    board[x][y] = symbol;
  };

  const getPos = (x, y) => board[x][y];

  const reset = (size) => {
    for (let i = 0; i < size; i++) {
      board[i] = [];
      for (let j = 0; j < size; j++) {
        board[i][j] = null;
      }
    }
  };

  const getSize = () => board.length;

  const checkWin = () => {
    const size = board.length;

    // Lines
    for (let i = 0; i < size; i++) {
      const row = board[i];
      console.log(row);
      if (row.every((cell) => cell === row[0] && cell !== null)) {
        return `L${i}`;
      }
    }

    // Columns
    for (let j = 0; j < size; j++) {
      const col = board.map((row) => row[j]);
      console.log(col);
      if (col.every((cell) => cell === col[0] && cell !== null)) {
        return `C${j}`;
      }
    }

    // Main Diag
    const mainDiagonal = board.map((row, i) => row[i]);
    if (
      mainDiagonal.every((cell) => cell === mainDiagonal[0] && cell !== null)
    ) {
      return "MD";
    }

    // Secondary Diag
    const secondaryDiagonal = board.map((row, i) => row[board.length - 1 - i]);
    if (
      secondaryDiagonal.every(
        (cell) => cell === secondaryDiagonal[0] && cell !== null
      )
    ) {
      return "SD";
    }

    return "";
  };

  return { setPos, getPos, reset, getSize, checkWin };
})();

export { gameboard };
