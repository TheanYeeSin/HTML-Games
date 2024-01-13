var player_score = 0;
var bot_score = 0;

function playRound(player_selection) {
  highlight_button(player_selection, "player");

  const bot_selection = get_bot_choice();
  highlight_button(bot_selection, "bot");
  const result = determine_winner(player_selection, bot_selection);
  update_score(result);

  setTimeout(() => {
    remove_highlight();
    update_score_board();
  }, 1000);
}

function get_bot_choice() {
  const choices = ["rock", "paper", "scissors"];
  const random_index = Math.floor(Math.random() * 3);
  return choices[random_index];
}

function determine_winner(player, bot) {
  if (player === bot) return "draw";
  if (
    (player === "rock" && bot === "scissors") ||
    (player === "paper" && bot === "rock") ||
    (player === "scissors" && bot === "paper")
  ) {
    return "player";
  } else {
    return "bot";
  }
}

function update_score(result) {
  if (result === "player") {
    player_score++;
  } else if (result === "bot") {
    bot_score++;
  }
}

function update_score_board() {
  const score_board_element = document.getElementById("score-board");
  score_board_element.textContent = `${player_score}:${bot_score}`;
}

function highlight_button(selection, side) {
  const buttons = document.querySelectorAll(`#${side}-side .${selection}`);
  buttons.forEach((button) => {
    button.classList.add(`highlight`);
  });
}

function remove_highlight() {
  const buttons = document.querySelectorAll(".game-options button");
  buttons.forEach((button) => {
    button.classList.remove("highlight");
  });
}
