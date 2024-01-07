import {
  BRICK_COLUMN_COUNT,
  BRICK_ROW_COUNT,
  BRICK_WIDTH,
  BRICK_HEIGHT,
  BRICK_COLOR,
  BRICK_OFFSET_LEFT,
  BRICK_OFFSET_TOP,
  BRICK_PADDING,
} from "./main.js";

//ADD BRICKS TO BRICKS VARIABLES
export function add_bricks() {
  var bricks = [];
  for (let r = 0; r < BRICK_ROW_COUNT; r++) {
    bricks[r] = [];
    for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
      bricks[r][c] = { x: 0, y: 0, status: 1 };
    }
  }
  return bricks;
}

//DRAW BRICKS
export function draw_bricks(context, bricks) {
  for (let r = 0; r < BRICK_ROW_COUNT; r++) {
    for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
      if (bricks[r][c].status === 1) {
        var brick_x = c * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
        var brick_y = r * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;
        bricks[r][c].x = brick_x;
        bricks[r][c].y = brick_y;
        context.beginPath();
        context.rect(brick_x, brick_y, BRICK_WIDTH, BRICK_HEIGHT);
        context.fillStyle = BRICK_COLOR;
        context.fill();
        context.closePath();
      }
    }
  }
}
