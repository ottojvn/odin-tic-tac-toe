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

  const configGame = () => {
    displayController.renderForm(startGame);
  };

  const startGame = (players) => {
    createPlayers(players);
    displayController.renderBoard(gameboard);
    /*while (!gameboard.checkWin()) {
      displayController.updateBoard(gameboard, playRound);
    }
    winner = activePlayer === players[0] ? players[1] : players[0];
    gameover(winner);*/
  };

  const gameover = (winner) => {
    displayController.renderWinner(winner, configGame);
  };

  return { getPlayer, configGame };
})();

game.configGame();
