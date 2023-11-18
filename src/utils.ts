export function slice2DArray<T>(
  arr: T[][],
  fromX: number,
  toX: number,
  fromY: number,
  toY: number
): T[][] {
  // Check if indices are within bounds
  if (fromX < 0 || fromX >= arr.length || toX < 0 || toX >= arr.length) {
    throw new Error('X indices are out of bounds');
  }

  if (fromY < 0 || fromY >= arr[0].length || toY < 0 || toY >= arr[0].length) {
    throw new Error('Y indices are out of bounds');
  }

  // Slice the 2D array based on the specified indices
  const slicedArray: T[][] = arr
    .slice(fromX, toX + 1)
    .map(row => row.slice(fromY, toY + 1));

  return slicedArray;
}

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
export function shuffle<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function createEmpty2dArray<T>(
  xlength: number,
  ylength: number,
  fill: T
): T[][] {
  return new Array(xlength).fill(0).map(() => new Array(ylength).fill(fill));
}
