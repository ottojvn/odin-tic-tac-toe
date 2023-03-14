const displayController = (() => {
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
      const boardsize = parseInt(
        form.querySelector('input[type="number"][name="boardsize"]').value
      );
      settings.players = [
        { player1Name, player1ai },
        { player2Name, player2ai },
      ];
      settings.boardsize = boardsize;
      callback(settings);
    });

    document.body.appendChild(formDiv);
  };

  const renderBoard = () => {
    clean();
  };

  return { renderForm, renderBoard };
})();

export { displayController };
