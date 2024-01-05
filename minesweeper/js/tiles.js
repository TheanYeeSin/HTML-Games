/*
=========================================================
TILES
=========================================================
*/

import { get_game_over, get_mines_location, set_game_over } from "./main.js";
import { reveal_all_mines, check_mines } from "./mines.js";

export function generate_tiles(row_count, column_count) {
  let board = [];
  for (let r = 0; r < row_count; r++) {
    let row = [];
    for (let c = 0; c < column_count; c++) {
      let tile = document.createElement("div");
      tile.id = `${r.toString()}-${c.toString()}`;
      tile.addEventListener("click", handle_left_click_tile);
      tile.addEventListener("contextmenu", handle_right_click_tile);
      tile.style.userSelect = "none";
      document.getElementById("game-board").append(tile);
      row.push(tile);
    }
    board.push(row);
  }
  return board;
}

function handle_left_click_tile(event) {
  let tile = this;
  if (get_game_over() || tile.classList.contains("tile-clicked")) {
    return;
  }

  let mines_location = get_mines_location();
  if (mines_location.includes(tile.id)) {
    reveal_all_mines();
    set_game_over(true);
    document.getElementById("mines-count").innerText = "LOSE";
    if (confirm("Game over. Another game?")) {
      location.reload();
    }
    return;
  }

  let coordinates = tile.id.split("-");
  let r = parseInt(coordinates[0]);
  let c = parseInt(coordinates[1]);
  check_mines(r, c);
}

function handle_right_click_tile(event) {
  let tile = this;
  if (get_game_over() || tile.classList.contains("tile-clicked")) {
    return;
  }

  if (tile.innerText === "") {
    tile.innerText = "🚩";
  } else if (tile.innerText === "🚩") {
    tile.innerText = "";
  }
  event.preventDefault();
}
