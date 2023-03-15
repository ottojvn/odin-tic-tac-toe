import { gameboard } from "./gameboard.js";
import { player } from "./player.js";
import { displayController } from "./displayController.js";

const game = (() => {
  let players = [];
  let activePlayer = null;
  let rounds;

  const playRound = (x, y) => {
    rounds++;
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    gameboard.setPos(x, y, activePlayer.getSymbol());
    displayController.updateBoard(gameboard, x, y);

    const win = gameboard.checkWin();
    if (win != "") {
      console.log(`${activePlayer.getName()} is the winner!`);
    } else if (rounds === gameboard.length ** 2) {
      console.log("It's a tie");
    }
  };

  const createPlayers = ([
    { player1Name, player1ai },
    { player2Name, player2ai },
  ]) => {
    players = [
      player(player1Name, player1ai, "x"),
      player(player2Name, player2ai, "o"),
    ];
  };

  const setupGame = () => {
    displayController.renderForm(startGame);
    rounds = 0;
  };

  const startGame = (settings) => {
    createPlayers(settings.players);
    gameboard.reset(settings.boardsize);
    displayController.renderBoard(gameboard, playRound);
  };

  const finishGame = (winner) => {
    displayController.renderWinner(winner, setupGame);
  };

  return { setupGame };
})();

game.setupGame();
