import { gameboard } from "./gameboard.js";
import { player } from "./player.js";
import { displayController } from "./displayController.js";

const game = (() => {
  let players = [];
  let activePlayer = null;

  const getPlayer = () => activePlayer;

  const playRound = (x, y) => {
    gameboard.markSpot(x, y, activePlayer.getSymbol());
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const createPlayers = ({
    player1name,
    player1ai,
    player2name,
    player2ai,
  }) => {
    players = [
      player(player1name, player1ai, "x"),
      player(player2name, player2ai, "o"),
    ];
  };

  const setupGame = () => {
    displayController.renderForm(startGame);
  };

  const startGame = (settings) => {
    createPlayers(settings.players);
    const gameboard = gameboard(settings.boardSize);
    gameboard.reset();
    displayController.renderBoard(gameboard);
    /*while (!gameboard.checkWin()) {
      displayController.updateBoard(gameboard, playRound);
    }
    winner = activePlayer === players[0] ? players[1] : players[0];
    finishGame(winner);*/
  };

  const finishGame = (winner) => {
    displayController.renderWinner(winner, setupGame);
  };

  return { setupGame };
})();

game.setupGame();
