import { BALL_RADIUS, BALL_COLOR } from "./main.js";

//DRAW BALL
export function draw_ball(context, ball_x, ball_y) {
  context.beginPath();
  context.arc(ball_x, ball_y, BALL_RADIUS, 0, Math.PI * 2);
  context.fillStyle = BALL_COLOR;
  context.fill();
  context.closePath();
}
