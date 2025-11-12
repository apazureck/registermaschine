import { accumulatorAddress } from "./registermaschine";

export enum AluOperation {
  Noop = "NOP",
  Add = "ADD",
  Subtract = "SUB",
  Multiply = "MUL",
  Divide = "DIV",
}

export class Alu {
  #currentOperation: AluOperation = AluOperation.Noop;
  #memoryInputIndex: number = accumulatorAddress;
}
