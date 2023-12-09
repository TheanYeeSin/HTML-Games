const ROW_GRID_SIZE = 25;
const COLUMN_GRID_SIZE = 25;

export function random_grid_position() {
  return {
    x: Math.floor(Math.random() * ROW_GRID_SIZE) + 1,
    y: Math.floor(Math.random() * COLUMN_GRID_SIZE) + 1,
  };
}

export function outside_grid(position) {
  return (
    position.x < 1 ||
    position.x > ROW_GRID_SIZE ||
    position.y < 1 ||
    position.y > COLUMN_GRID_SIZE
  );
}
