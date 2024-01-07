import { PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_COLOR } from "./main.js";

//DRAW PADDLE
export function draw_paddle(canvas, context, paddle_x) {
  context.beginPath();
  context.rect(
    paddle_x,
    canvas.height - PADDLE_HEIGHT * 5,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
  );
  context.fillStyle = PADDLE_COLOR;
  context.fill();
  context.closePath();
}
