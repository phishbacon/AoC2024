import { readTextFile } from "./utils.ts";

const input: string = await readTextFile();

const [...match]: Array<RegExpExecArray> = Array.from(input.matchAll(/(don't\(\))|(do\(\))|(mul\(\d+,\d+\))/g));
const [...matchMul]: Array<RegExpExecArray> = Array.from(input.matchAll(/mul\(\d+,\d+\)/g));

const instructions: Array<string> = match.map(e => e[0]);
const mulInstructions: Array<string> = matchMul.map(e => e[0]);

function performMul(instruction: string): number {
  const operands: RegExpMatchArray | null = instruction.match(/\((\d+),(\d+)/);

  if (operands) {
    const operand1: string | undefined = operands[1];
    const operand2: string | undefined = operands[2];
    if (operand1 && operand2) {
      return (parseInt(operand1) * parseInt(operand2));
    } else {
      throw new Error("Operand undefined");
    }
  } else {
    throw new Error("Unable to parse instruction string");
  }
}

function performInstructions(instructions: Array<string>): number {
  const do_: string = "do()";
  const dont_: string = "don't()";
  let doing: boolean = true;
  let acc: number = 0;

  for (let i = 0; i < instructions.length; i++) {
    const currentInstruction: string | undefined = instructions[i];
    if (currentInstruction) {
      if (currentInstruction === dont_) {
        doing = false;
      } else if (currentInstruction === do_) {
        doing = true;
      } else if (doing) {
        acc += performMul(currentInstruction);
      } else {
        continue;
      }
    } else {
      throw new Error("Instruction undefined");
    }
  }
  return acc;
}

let result = mulInstructions.reduce((acc, e) => acc + performMul(e), 0);
console.log(result); // 187833789

result = performInstructions(instructions);
console.log(result); // 94455185
