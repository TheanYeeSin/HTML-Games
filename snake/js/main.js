/*
=========================================================
MAIN
=========================================================
*/

import {
  update_snake,
  render_snake,
  get_snake_head,
  snake_intersection,
  SNAKE_SPEED_PER_SECOND,
} from "./snake.js";
import { update_apple, render_apple } from "./apple.js";
import { outside_grid } from "./grid.js";

let last_render_time = 0;
let is_game_over = false;
const game_board = document.getElementById("game-board");
const score_board = document.getElementById("score-board");

//MAIN FUNCTION
function main(current_time) {
  if (is_game_over) {
    if (confirm("Game over. Another game?")) {
      location.reload();
    }
    return;
  }
  window.requestAnimationFrame(main);
  const seconds_since_last_render = (current_time - last_render_time) / 1000;
  if (seconds_since_last_render < 1 / SNAKE_SPEED_PER_SECOND) return;
  last_render_time = current_time;

  update();
  render();
}

window.requestAnimationFrame(main);

//UPDATE THE GAME
function update() {
  update_snake();
  update_apple();
  check_death();
}

//RENDER THE GAME
function render() {
  game_board.innerHTML = "";
  render_snake(game_board);
  render_apple(game_board);
}

//CHECK WHETHER THE SNAKE IS DEAD
function check_death() {
  is_game_over = outside_grid(get_snake_head()) || snake_intersection();
}

export function update_score(amount) {
  const current_score = parseInt(score_board.textContent);
  const new_score = current_score + amount;
  score_board.textContent = new_score;
}
