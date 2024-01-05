/*
=========================================================
MINES
=========================================================
*/

import {
  BOARD_COLUMN_COUNT,
  BOARD_ROW_COUNT,
  get_board,
  get_mines_location,
  set_board,
  increase_tiles_clicked,
  get_tiles_clicked,
  MINES_COUNT,
  set_game_over,
  get_game_over,
} from "./main.js";

export function generate_mines() {
  let mines_location = [];

  let mines_left = MINES_COUNT;
  while (mines_left > 0) {
    let r = Math.floor(Math.random() * BOARD_ROW_COUNT);
    let c = Math.floor(Math.random() * BOARD_COLUMN_COUNT);
    let id = `${r.toString()}-${c.toString()}`;

    if (!mines_location.includes(id)) {
      mines_location.push(id);
      mines_left -= 1;
    }
  }

  return mines_location;
}

export function reveal_all_mines() {
  let board = get_board();
  let mines_location = get_mines_location();
  for (let r = 0; r < BOARD_ROW_COUNT; r++) {
    for (let c = 0; c < BOARD_COLUMN_COUNT; c++) {
      let tile = board[r][c];
      if (mines_location.includes(tile.id)) {
        tile.innerText = "💣";
        tile.style.backgroundColor = "red";
      }
    }
  }
}

export function check_mines(r, c) {
  let board = get_board();
  if (r < 0 || r >= BOARD_ROW_COUNT || c < 0 || c >= BOARD_COLUMN_COUNT) {
    return;
  }

  if (board[r][c].classList.contains("tile-clicked")) {
    return;
  }

  board[r][c].classList.add("tile-clicked");
  increase_tiles_clicked(1);

  let mines_count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      mines_count += check_mines_tile(r + i, c + j);
    }
  }

  if (mines_count > 0) {
    board[r][c].innerText = mines_count;
    board[r][c].classList.add(`x${mines_count.toString()}`);
    set_board(board);
  } else {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        check_mines(r + i, c + j);
      }
    }
  }
  check_game_over();
}

function check_mines_tile(r, c) {
  let mines_location = get_mines_location();
  if (r < 0 || r >= BOARD_ROW_COUNT || c < 0 || c >= BOARD_COLUMN_COUNT) {
    return 0;
  }
  if (mines_location.includes(`${r.toString()}-${c.toString()}`)) {
    return 1;
  }
  return 0;
}

function check_game_over() {
  let tiles_clicked = get_tiles_clicked();
  let is_game_over = get_game_over();
  if (
    tiles_clicked === BOARD_ROW_COUNT * BOARD_COLUMN_COUNT - MINES_COUNT &&
    is_game_over != true
  ) {
    document.getElementById("mines-count").innerText = "WIN";
    set_game_over(true);
    if (confirm("Game over. Another game?")) {
      location.reload();
    }
    return;
  }
  return;
}
