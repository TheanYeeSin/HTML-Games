function createSquares() {
  const game_board = document.getElementsByClassName("board");
  const total_square = 30;

  for (let i = 0; i < total_square; i++) {
    let square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("id", i + 1);
    game_board[0].appendChild(square);
  }
}

document.addEventListener("DOMContentLoaded", createSquares);
