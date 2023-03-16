const displayController = (() => {
  let lastPlayed = "o";

  const clean = () => {
    const game = document.body.querySelector("#game");
    if (game != null) {
      document.body.removeChild(game);
    }
  };

  const renderForm = (callback) => {
    clean();
    const formDiv = document.createElement("div");
    formDiv.id = "game";

    const form = document.createElement("form");
    formDiv.appendChild(form);

    for (let i = 1; i < 3; i++) {
      const playerDiv = document.createElement("div");
      playerDiv.classList.add("player-div");
      playerDiv.classList.add("form-section");
      form.appendChild(playerDiv);

      const playerNameDiv = document.createElement("div");
      playerNameDiv.classList.add("player-name-div");
      playerDiv.appendChild(playerNameDiv);

      const playerNameLabel = document.createElement("label");
      playerNameLabel.setAttribute("for", `player-${i}-name`);
      playerNameLabel.textContent = `Player ${i} name`;
      playerNameDiv.appendChild(playerNameLabel);

      const playerNameInput = document.createElement("input");
      playerNameInput.name = `player-${i}-name`;
      playerNameInput.id = `player-${i}-name`;
      playerNameInput.type = "text";
      playerNameInput.required = true;
      playerNameInput.value = `Player ${i}`;
      playerNameInput.maxLength = "16";
      playerNameDiv.appendChild(playerNameInput);

      const playerTypeDiv = document.createElement("div");
      playerTypeDiv.classList.add("player-type-div");
      playerDiv.appendChild(playerTypeDiv);

      const playerTypeHumanDiv = document.createElement("div");
      playerTypeHumanDiv.classList.add("player-type-human-div");
      playerTypeDiv.appendChild(playerTypeHumanDiv);

      const playerTypeHumanButton = document.createElement("input");
      playerTypeHumanButton.type = "radio";
      playerTypeHumanButton.name = `player-${i}-type`;
      playerTypeHumanButton.value = "player";
      playerTypeHumanButton.checked = true;
      playerTypeHumanDiv.appendChild(playerTypeHumanButton);

      const playerTypeHumanLabel = document.createElement("label");
      playerTypeHumanLabel.for = `player-${i}-type`;
      playerTypeHumanLabel.textContent = "Player";
      playerTypeHumanDiv.appendChild(playerTypeHumanLabel);

      const playerTypeBotDiv = document.createElement("div");
      playerTypeBotDiv.classList.add("player-type-bot-div");
      playerTypeDiv.appendChild(playerTypeBotDiv);

      const playerTypeBotButton = document.createElement("input");
      playerTypeBotButton.type = "radio";
      playerTypeBotButton.name = `player-${i}-type`;
      playerTypeBotButton.value = "bot";
      playerTypeBotDiv.appendChild(playerTypeBotButton);

      const playerTypeBotLabel = document.createElement("label");
      playerTypeBotLabel.for = `player-${i}-type`;
      playerTypeBotLabel.textContent = "Bot";
      playerTypeBotDiv.appendChild(playerTypeBotLabel);
    }

    /*
    const boardsizeDiv = document.createElement("div");
    boardsizeDiv.classList.add("form-section");
    form.appendChild(boardsizeDiv);

    const boardsizeLabel = document.createElement("label");
    boardsizeLabel.for = "boardsize";
    boardsizeLabel.textContent = "Board size";
    boardsizeDiv.appendChild(boardsizeLabel);

    const boardsizeInput = document.createElement("input");
    boardsizeInput.type = "number";
    boardsizeInput.name = "boardsize";
    boardsizeInput.min = "3";
    boardsizeInput.max = "12";
    boardsizeInput.value = "3";
    boardsizeInput.required = true;
    boardsizeDiv.appendChild(boardsizeInput);
    */

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("form-section");
    form.appendChild(buttonDiv);

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Start Game";
    buttonDiv.appendChild(submitButton);

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const settings = {};
      const player1Name = form.querySelector("input#player-1-name").value;
      const player1ai =
        form.querySelector('input[type="radio"][name="player-1-type"]:checked')
          .value == "bot";
      const player2Name = form.querySelector("input#player-2-name").value;
      const player2ai =
        form.querySelector('input[type="radio"][name="player-2-type"]:checked')
          .value == "bot";
      /*
      const boardsize = parseInt(
        form.querySelector('input[type="number"][name="boardsize"]').value
      );
      */
      settings.players = [
        { player1Name, player1ai },
        { player2Name, player2ai },
      ];
      // settings.boardsize = boardsize;
      settings.boardsize = 3;
      callback(settings);
    });

    document.body.appendChild(formDiv);
  };

  const renderBoard = (gameboard, callback) => {
    clean();

    const gameDiv = document.createElement("div");
    gameDiv.id = "game";
    document.body.appendChild(gameDiv);

    const boardDiv = document.createElement("div");
    boardDiv.id = "board";
    boardDiv.setAttribute("style", `--size: ${gameboard.getSize()}`);
    gameDiv.appendChild(boardDiv);

    for (let x = 0; x < gameboard.getSize(); x++) {
      for (let y = 0; y < gameboard.getSize(); y++) {
        const cell = document.createElement("div");
        cell.classList.add("board-cell");
        cell.id = `board-cell-${x}-${y}`;

        cell.addEventListener("mouseenter", (event) => {
          event.preventDefault();
          if (!cell.classList.contains("played")) {
            cell.textContent = lastPlayed == "x" ? "O" : "X";
            cell.style = "color: rgba(138, 0, 0, 0.5)";
          }
        });
        cell.addEventListener("mouseleave", (event) => {
          event.preventDefault();
          if (!cell.classList.contains("played")) {
            cell.textContent = "";
            cell.removeAttribute("style");
          }
        });

        const handleClick = (event) => {
          event.preventDefault();
          cell.removeAttribute("style");
          callback(x, y);
          event.target.removeEventListener("click", handleClick);
        };

        cell.addEventListener("click", handleClick);

        boardDiv.appendChild(cell);
      }
    }
  };

  const updateBoard = (board, x, y) => {
    const cell = document.body.querySelector(`div#board-cell-${x}-${y}`);
    lastPlayed = board.getPos(x, y);
    cell.textContent = lastPlayed.toUpperCase();
    cell.classList.add("played");
  };

  const renderWinner = (status, callback) => {
    const game = document.body.querySelector("#game");
    game.querySelector("#board").classList.add("disable");

    const winTextDiv = document.createElement("div");
    winTextDiv.id = "winner-div";
    game.appendChild(winTextDiv);

    const winText = document.createElement("p");
    winText.id = "winner";
    winTextDiv.appendChild(winText);

    const restart = document.createElement("p");
    restart.textContent = "Click anywhere to restart";
    restart.id = "play-again";
    winTextDiv.appendChild(restart);

    if (status.condition === "tie") {
      winText.textContent = "It's a tie!";
    } else {
      winText.textContent = `${status.winner.getName()} is the winner!`;
    }

    setTimeout(() => {
      game.addEventListener("click", (event) => {
        event.preventDefault();
        callback();
      });
    }, 3000);
  };

  return { renderForm, renderBoard, updateBoard, renderWinner };
})();

export { displayController };
