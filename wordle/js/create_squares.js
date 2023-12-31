//DO AFTER PAGE LOADED
document.addEventListener("DOMContentLoaded", create_squares);

//CREATE 30 SQUARES
function create_squares() {
  const game_board = document.getElementsByClassName("board");
  const total_square = 30;

  for (let i = 0; i < total_square; i++) {
    let square = document.createElement("div");
    square.classList.add("square");
    square.classList.add("animate__animated");
    square.setAttribute("id", `square-${i + 1}`);
    game_board[0].appendChild(square);
  }
}
