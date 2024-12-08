import { ReadTextFile } from "./utils.ts";

const input: string = await ReadTextFile();

const inputStringArray: Array<string> = input.split(/\s+/);
const inputNumberArray: Array<number> = inputStringArray.map(str => parseInt(str));
const inputNumberList1: Array<number> = inputNumberArray.filter((_e, i) => i % 2 === 0).sort((a, b) => a - b);
const inputNumberList2: Array<number> = inputNumberArray.filter((_e, i) => i % 2 !== 0).sort((a, b) => a - b);
const resultArray: Array<number> = [];
let finalResult: number = 0;

// part one
for (let i = 0; i < inputNumberList1.length; i++) {
  const list1Element: number | undefined = inputNumberList1[i];
  const list2Element: number | undefined = inputNumberList2[i];

  if (list1Element && list2Element) {
    resultArray.push(Math.abs(list1Element - list2Element));
  }
}

finalResult = resultArray.reduce((a, e) => {return a + e}, 0);

console.log(finalResult); //1590491

// part two
finalResult = inputNumberList1.reduce((a, e) => {
  return a + (e * (inputNumberList2.filter(el => e === el)).length);
}, 0);

console.log(finalResult); //22588371