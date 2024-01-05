/*
=========================================================
MAIN
=========================================================
*/

import { generate_tiles } from "./tiles.js";
import { generate_mines } from "./mines.js";

export const BOARD_ROW_COUNT = 16;
export const BOARD_COLUMN_COUNT = 16;
export const MINES_COUNT = 36;

let board = [];
let mines_location = [];
let is_game_over = false;

let tiles_clicked = 0;

const game_event = new Event("game_over");

document.addEventListener("DOMContentLoaded", () => {
  start_game();
});

document.addEventListener("game_over", handle_game_over);

function start_game() {
  document.getElementById("mines-count").innerText = MINES_COUNT;
  board = generate_tiles(BOARD_ROW_COUNT, BOARD_COLUMN_COUNT);
  mines_location = generate_mines();
}

function handle_game_over() {
  if (is_game_over) {
    alert("Game over. Another game?");
    location.reload();
  }
}

//ALL THE NECESSARY GETTER AND SETTER
export function get_mines_location() {
  return mines_location;
}

export function get_board() {
  return board;
}

export function set_board(new_board) {
  board = new_board;
}

export function set_game_over(game_over) {
  is_game_over = game_over;
  // document.dispatchEvent(game_event);
}

export function get_game_over() {
  return is_game_over;
}

export function increase_tiles_clicked(clicked_amount) {
  tiles_clicked += clicked_amount;
}

export function get_tiles_clicked() {
  return tiles_clicked;
}
