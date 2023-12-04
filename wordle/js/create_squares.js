document.addEventListener("DOMContentLoaded", create_squares);

function create_squares() {
  const game_board = document.getElementsByClassName("board");
  const total_square = 30;

  for (let i = 0; i < total_square; i++) {
    let square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("id", `square-${i + 1}`);
    game_board[0].appendChild(square);
  }
}
