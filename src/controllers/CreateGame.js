export function CreateGame(size, mines) {
  const mine = -1;

  const field = [];

  function inc(x, y) {
    if (x >= 0 && x < size && y >= 0 && y < size) {
      if (field[y][x] === mine) return;

      field[y][x] += 1;
    }
  }

  for (let i = 0; i < size; i++) {
    field.push(Array(size).fill(0));
  }

  //create mines
  for (let i = 0; i < mines; ) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);

    if (field[y][x] === mine) continue;

    field[y][x] = mine;

    i += 1;

    inc(x, y - 1);
    inc(x, y + 1);
    inc(x - 1, y);
    inc(x + 1, y);
    inc(x + 1, y + 1);
    inc(x + 1, y - 1);
    inc(x - 1, y - 1);
    inc(x - 1, y + 1);
  }

  return field;
}
