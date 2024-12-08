import { readTextFile } from "./utils.ts";

const input: string = await readTextFile();
const reports: Array<Array<number>> = input.split("\n").map((a) => a.split(" ").map((aa) => parseInt(aa)));

let safeReports: number = reports.reduce((acc, e) => (isReportSafe(e) ? acc + 1 : acc), 0);

console.log(safeReports); //321

function isReportSafe(arr: Array<number>): boolean {
  const eString: string = arr.toString();
  const eAscending: string = arr.toSorted((a, b) => a - b).toString();
  const eDescending: string = arr.toSorted((a, b) => b - a).toString();
  if (eString === eDescending || eString === eAscending) {
    for (let i = 0; i < arr.length - 1; i++) {
      const elementI: number | undefined = arr[i];
      const elementIPlus1: number | undefined = arr[i + 1];
      if (elementI && elementIPlus1) {
        if (Math.abs(elementI - elementIPlus1) == 0 || Math.abs(elementI - elementIPlus1) > 3) {
          return false;
        }
      } else {
        throw new Error("Array elements are undefined");
      }
    }
    return true;
  } 
  return false;
}

function isReportSafeRemovingOneElement(arr: Array<number>): boolean {
  for (let i = 0; i < arr.length; i++) {
    const arrCopySplice: Array<number> = arr.toSpliced(i, 1);
    if (isReportSafe(arrCopySplice)) {
      return true;
    }
  }
  return false;
}

safeReports = reports.reduce((acc, e) => (isReportSafe(e) || isReportSafeRemovingOneElement(e) ? acc + 1 : acc), 0);

console.log(safeReports); // 386