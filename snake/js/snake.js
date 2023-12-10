/*
=========================================================
SNAKE
=========================================================
*/

import { get_input_direction } from "./input.js";

export const SNAKE_SPEED_PER_SECOND = 7;
const snake_body = [{ x: 13, y: 13 }];
let new_segment = 0;

//UPDATE SNAKE (POSITION, INPUT ETC)
export function update_snake() {
  add_segments();
  const input_direction = get_input_direction();
  for (let i = snake_body.length - 2; i >= 0; i--) {
    snake_body[i + 1] = { ...snake_body[i] };
  }

  snake_body[0].x += input_direction.x;
  snake_body[0].y += input_direction.y;
}

//RENDER THE SNAKE
export function render_snake(game_board) {
  snake_body.forEach((segment) => {
    const snake_element = document.createElement("div");
    snake_element.style.gridRowStart = segment.y;
    snake_element.style.gridColumnStart = segment.x;
    snake_element.classList.add("snake");
    game_board.append(snake_element);
  });
}

//CHECK WHETHER COLLAPSE WITH THE SNAKE
export function on_snake(position, { ignore_head = false } = {}) {
  return snake_body.some((segment, index) => {
    if (ignore_head && index === 0) return false;

    return equal_positions(segment, position);
  });
}

//RETURN SNAKE HEAD INDEX
export function get_snake_head() {
  return snake_body[0];
}

export function snake_intersection() {
  return on_snake(snake_body[0], { ignore_head: true });
}

export function expand_snake(amount) {
  new_segment += amount;
}

function equal_positions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y == pos2.y;
}

function add_segments() {
  for (let i = 0; i < new_segment; i++) {
    snake_body.push({ ...snake_body[snake_body.length - 1] });
  }

  new_segment = 0;
}
