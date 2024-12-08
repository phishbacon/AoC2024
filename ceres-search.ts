import { readTextFile } from "./utils.ts";

const input: string = await readTextFile();
const inputLetterArray: Array<string> = input.split("\n");

function horizontal(arr: Array<string>, row: number, col: number): number {
  let acc = 0
  const arrRow: string = arr[row] ?? "";
  if (arrRow[col] === "X") {
    if (arrRow.slice(col, col + 4) === "XMAS") {
      acc++;
    } 
    if (arrRow[col - 1] === "M" &&
      arrRow[col - 2] === "A" &&
      arrRow[col - 3] === "S") {
      acc++;
    }
  }
  return acc;
}

function vertical(arr: Array<string>, row: number, col: number): number {
  let acc = 0;
  if ((arr[row] ?? "")[col] === "X") {
    if ((arr[row + 1] ?? "")[col] === "M" &&
      (arr[row + 2] ?? "")[col] === "A" &&
      (arr[row + 3] ?? "")[col] === "S") {
      acc++;
    } 
    if ((arr[row - 1] ?? "")[col] === "M" &&
      (arr[row - 2] ?? "")[col] === "A" &&
      (arr[row - 3] ?? "")[col] === "S") {
      acc++
    }
  }
  return acc;
}

function diagonal(arr: Array<string>, row: number, col: number): number {
  // from x
  // up and to the right
  // up and to the left
  // down and to the left
  // down and to the right

  let acc = 0;
  if ((arr[row] ?? "")[col] === "X") {
    if ((arr[row - 1] ?? "")[col + 1] === "M" &&
      (arr[row - 2] ?? "")[col + 2] === "A" &&
      (arr[row - 3] ?? "")[col + 3] === "S") {
      acc++;
    } 
    if ((arr[row - 1] ?? "")[col - 1] === "M" &&
      (arr[row - 2] ?? "")[col - 2] === "A" &&
      (arr[row - 3] ?? "")[col - 3] === "S") {
      acc++;
    } 
    if ((arr[row + 1] ?? "")[col - 1] === "M" &&
      (arr[row + 2] ?? "")[col - 2] === "A" &&
      (arr[row + 3] ?? "")[col - 3] === "S") {
      acc++
    } 
    if ((arr[row + 1] ?? "")[col + 1] === "M" &&
      (arr[row + 2] ?? "")[col + 2] === "A" &&
      (arr[row + 3] ?? "")[col + 3] === "S") {
      acc++
    }
  }
  return acc;
}

function xMAS(arr: Array<string>, row: number, col: number): boolean {
  // M S   S M   M M   S S
  //  A     A     A     A
  // M S   S M   S S   M M

  if ((arr[row] ?? "")[col] === "A") {
    if ((arr[row - 1] ?? "")[col - 1] === "M" &&
      (arr[row - 1] ?? "")[col + 1] === "S" &&
      (arr[row + 1] ?? "")[col - 1] === "M" &&
      (arr[row + 1] ?? "")[col + 1] === "S") {
      return true
    } 
    if ((arr[row - 1] ?? "")[col - 1] === "S" &&
      (arr[row - 1] ?? "")[col + 1] === "M" &&
      (arr[row + 1] ?? "")[col - 1] === "S" &&
      (arr[row + 1] ?? "")[col + 1] === "M") {
      return true;
    } 
    if ((arr[row - 1] ?? "")[col - 1] === "M" &&
      (arr[row - 1] ?? "")[col + 1] === "M" &&
      (arr[row + 1] ?? "")[col - 1] === "S" &&
      (arr[row + 1] ?? "")[col + 1] === "S") {
      return true
    } 
    if ((arr[row - 1] ?? "")[col - 1] === "S" &&
      (arr[row - 1] ?? "")[col + 1] === "S" &&
      (arr[row + 1] ?? "")[col - 1] === "M" &&
      (arr[row + 1] ?? "")[col + 1] === "M") {
      return true;
    } 
  }
  return false;
}

function iterateOverArray(arr: Array<string>): Array<number> {
  const rows: number = arr.length;
  const cols: number = (arr[0] ?? []).length;
  let acc: number = 0;
  let xMASacc: number = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // check horizontal forwards
      acc += (horizontal(arr, row, col));
      acc += (vertical(arr, row, col));
      acc += (diagonal(arr, row, col));
      if (xMAS(arr, row, col)) xMASacc++;
    }
  }
  return [acc, xMASacc];
}

const [partOne, partTwo] = iterateOverArray(inputLetterArray);
console.log(partOne);
console.log(partTwo);