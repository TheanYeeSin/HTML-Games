import { draw_paddle } from "./paddle.js";
import { add_bricks, draw_bricks } from "./brick.js";
import { draw_ball } from "./ball.js";

var canvas = document.getElementById("game-canvas");
var score_board = document.getElementById("score-board");
var context = canvas.getContext("2d");

// Display initial text on the canvas

//FOR CANVAS
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.85;

//START SCREEN
context.font = '24px "Press Start 2P", cursive';
context.fillStyle = "#dddddd";
context.textAlign = "center";
context.textBaseline = "middle";
context.fillText("Press any key to start", canvas.width / 2, canvas.height / 2);

//FOR BALL
export const BALL_RADIUS = 10;
var ball_x = canvas.width / 2;
var ball_y = canvas.height / 2;
var ball_dx = Math.random() < 0.5 ? 3 : -3;
var ball_dy = -3;
export const BALL_COLOR = "#dddddd";

//FOR PADDLE
export const PADDLE_HEIGHT = 10;
export const PADDLE_WIDTH = 80;
var paddle_x = (canvas.width - PADDLE_WIDTH) / 2;
var paddle_y = canvas.height - PADDLE_HEIGHT * 5;
const PADDLE_SPEED = 8;
export const PADDLE_COLOR = "#dcdcdc";

//FOR BRICKS
export const BRICK_ROW_COUNT = 5;
export const BRICK_COLUMN_COUNT = 12;
export const BRICK_WIDTH = 85;
export const BRICK_HEIGHT = 20;
export const BRICK_PADDING = 20;
export const BRICK_OFFSET_TOP = 30;
export const BRICK_OFFSET_LEFT =
  (canvas.width - (BRICK_WIDTH + BRICK_PADDING) * BRICK_COLUMN_COUNT) / 2;
export const BRICK_COLOR = "#dcdcdc";

let bricks = [];

//FOR KEY PRESS
var right_pressed = false;
var left_pressed = false;

var score = 0;
var is_game_over = false;

//ADD LISTENER TO KEYBOARD KEYDOWN EVENT
addEventListener("keydown", handle_key_down);
function handle_key_down(event) {
  if (event.key == "Right" || event.key == "ArrowRight" || event.key == "d") {
    right_pressed = true;
  } else if (
    event.key == "Left" ||
    event.key == "ArrowLeft" ||
    event.key == "a"
  ) {
    left_pressed = true;
  }
}

addEventListener("keyup", handle_key_up);
function handle_key_up(event) {
  if (event.key == "Right" || event.key == "ArrowRight" || event.key == "d") {
    right_pressed = false;
  } else if (
    event.key == "Left" ||
    event.key == "ArrowLeft" ||
    event.key == "a"
  ) {
    left_pressed = false;
  }
}

//CHECK IF BALL HIT BRICKS
function collision_detection() {
  for (let r = 0; r < BRICK_ROW_COUNT; r++) {
    for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
      var brick = bricks[r][c];
      if (
        brick.status == 1 &&
        ball_x >= brick.x &&
        ball_x <= brick.x + BRICK_WIDTH &&
        ball_y >= brick.y &&
        ball_y <= brick.y + BRICK_HEIGHT
      ) {
        ball_dy = -ball_dy;
        brick.status = 0;
        score++;
        if (score == BRICK_COLUMN_COUNT * BRICK_ROW_COUNT) {
          if (confirm("You WON. Another game?")) {
            location.reload();
          }
        }
      }
    }
  }
}

//HANDLE LEFT CLICK AND RIGHT CLICK
function handle_key_press() {
  if (left_pressed) {
    paddle_x -= PADDLE_SPEED;
    if (paddle_x < 0) {
      paddle_x = 0;
    }
  } else if (right_pressed) {
    paddle_x += PADDLE_SPEED;
    if (paddle_x + PADDLE_WIDTH > canvas.width) {
      paddle_x = canvas.width - PADDLE_WIDTH;
    }
  }
}

//UPDATE THE BALLS POSITION
export function update_ball_direction() {
  if (
    ball_x + ball_dx > canvas.width - BALL_RADIUS ||
    ball_x + ball_dy < BALL_RADIUS
  ) {
    //HIT THE SIDES
    ball_dx = -ball_dx;
  }
  if (ball_y + ball_dy < BALL_RADIUS) {
    //HIT THE CEILLING
    ball_dy = -ball_dy;
  } else if (
    ball_y >= paddle_y &&
    ball_y <= paddle_y + PADDLE_HEIGHT &&
    ball_x >= paddle_x &&
    ball_x <= paddle_x + PADDLE_WIDTH
  ) {
    //HIT THE PADDLE
    ball_dy = -ball_dy;
  } else if (
    ball_y + ball_dy > canvas.height - BALL_RADIUS &&
    is_game_over == false
  ) {
    //HIT THE BOTTOM
    is_game_over = true;
    if (confirm("Game over. Another game?")) {
      location.reload();
    }
  }
}

//UPDATE SCORE
function update_score() {
  score_board.innerText = score.toString();
}

//MAIN FUNCTION
function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  draw_bricks(context, bricks);
  draw_ball(context, ball_x, ball_y);
  draw_paddle(canvas, context, paddle_x);

  collision_detection();
  update_score();
  update_ball_direction();
  handle_key_press();
  ball_x += ball_dx;
  ball_y += ball_dy;

  if (!is_game_over) {
    requestAnimationFrame(draw);
  }
}

//PRESS ANY KEY TO START
document.addEventListener("keydown", start_game);
function start_game(event) {
  document.removeEventListener("keydown", start_game);
  bricks = add_bricks();
  draw();
}
