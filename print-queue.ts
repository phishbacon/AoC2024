import { ReadTextFile } from "./utils.ts";

const input: string = await ReadTextFile();
const [rules, pages] = input.split("\n\n");
const rulesArray = rules?.split("\n").map((e) => e.split("|"));
const pagesArray = pages?.split("\n").map((e) => e.split(","));

function isManualSafe(manual: Array<string>, rules: Array<Array<string>>): boolean {
    // loop over rules
  for (let j = 0; j < rules.length; j++) {
    const rule = rules[j] ?? [];
    const rule0 = rule[0] ?? "";
    const rule1 = rule[1] ?? "";
    if (manual.includes(rule0) && manual.includes(rule1)) {
      if (isRuleFollowed(manual, rule)) {
        continue;
      } else {
        return false;
      }
    } else {
      continue;
    }
  }
  return true;
}

function isRuleFollowed(manual: Array<string>, rule: Array<string>): boolean {
  const rule0 = rule[0] ?? "";
  const rule1 = rule[1] ?? "";
  if (manual.findIndex((e) => e === rule0) < manual.findIndex((e) => e === rule1)) {
    return true;
  } else {
    return false;
  }
}

if (!pagesArray) {
  throw new Error("Unable to read input manuals");
}

const result = pagesArray.reduce((acc, e) => {
  if (isManualSafe(e, rulesArray ?? [])) {
    return acc + Number(e[Math.floor((e.length - 1) / 2)]);
  }
  return acc;
}, 0);

console.log(result);