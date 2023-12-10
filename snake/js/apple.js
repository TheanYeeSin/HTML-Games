/*
=========================================================
APPLE
=========================================================
*/

import { on_snake, expand_snake } from "./snake.js";
import { random_grid_position } from "./grid.js";
import { update_score } from "./main.js";

let apple_position = get_random_apple_position();
const EXPANSION_RATE = 1;
const SCORE_PER_APPLE = 1;

//UPDATE APPLE
export function update_apple() {
  if (on_snake(apple_position)) {
    expand_snake(EXPANSION_RATE);
    update_score(SCORE_PER_APPLE);
    apple_position = get_random_apple_position();
  }
}

//RENDER APPLE
export function render_apple(game_board) {
  const apple_element = document.createElement("div");
  apple_element.style.gridRowStart = apple_position.y;
  apple_element.style.gridColumnStart = apple_position.x;
  apple_element.classList.add("apple");
  game_board.append(apple_element);
}

//GENERATE A RANDOM POSITION FOR APPLE
export function get_random_apple_position() {
  let new_food_position;
  while (new_food_position == null || on_snake(new_food_position)) {
    new_food_position = random_grid_position();
  }
  return new_food_position;
}
