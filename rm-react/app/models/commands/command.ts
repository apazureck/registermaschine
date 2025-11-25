export enum CommandCode {
  Jump = "JMP",
  JumpEqualsZero = "JEZ",
  JumpNotZero = "JNZ",
  JumpNotEqual = 'JNE',
  JumpLessZero = "JLZ",
  JumpLessEqualsZero = "JLE",
  JumpGreaterZero = "JGZ",
  JumpGreaterEqualsZero = "JGE",

  Add = "ADD",
  Subtract = "SUB",
  Multiply = "MUL",
  Divide = "DIV",

  LoadToAccumulator = "LDA",
  LoadConstantToAccumulator = "LDK",
  StoreFromAccumulator = "STA",

  Input = "INP",
  Output = "OUT",
  Halt = "HLT",
}

export class Command {
  public readonly code: CommandCode;
  public readonly operand: string;

  constructor(public opString: string) {
    const opArray = opString.trim().split(" ");
    if (opArray.length !== 2) {
      throw new Error(`Invalid command string: ${opString}`);
    }
    this.code = opArray[0].toUpperCase() as CommandCode;
    this.operand = opArray[1];
  }
}
