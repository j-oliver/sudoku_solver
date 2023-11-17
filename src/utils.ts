export function slice2DArray(
  arr: number[][],
  fromX: number,
  toX: number,
  fromY: number,
  toY: number
): number[][] {
  // Check if indices are within bounds
  if (fromX < 0 || fromX >= arr.length || toX < 0 || toX >= arr.length) {
    throw new Error('X indices are out of bounds');
  }

  if (fromY < 0 || fromY >= arr[0].length || toY < 0 || toY >= arr[0].length) {
    throw new Error('Y indices are out of bounds');
  }

  // Slice the 2D array based on the specified indices
  const slicedArray: number[][] = arr
    .slice(fromX, toX + 1)
    .map(row => row.slice(fromY, toY + 1));

  return slicedArray;
}
