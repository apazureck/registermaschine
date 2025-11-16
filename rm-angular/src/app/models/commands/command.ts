import { RmComponents } from '../registermaschine';

export enum CommandCode {
  Jump = 'JMP',
  JumpEqualsZero = 'JEZ',
  JumpNotZero = 'JNZ',
  JumpLessZero = 'JLZ',
  JumpLessEqualsZero = 'JLE',
  JumpGreaterZero = 'JGZ',
  JumpGreaterEqualsZero = 'JGE',

  Add = 'ADD',
  Subtract = 'SUB',
  Multiply = 'MUL',
  Divide = 'DIV',

  LoadToAccumulator = 'LDA',
  LoadConstantToAccumulator = 'LDK',
  StoreFromAccumulator = 'STA',

  Input = 'INP',
  Output = 'OUT',
  Halt = 'HLT',
  Noop = 'NOP',

  INVALID = 'INVALID',
}

export abstract class Command {
  public readonly code: CommandCode;
  public readonly operand: string;

  constructor(public opString: string) {
    const opArray = opString.trim().split(' ');
    if (opArray.length !== 2) {
      throw new Error(`Invalid command string: ${opString}`);
    }
    this.code = opArray[0].toUpperCase() as CommandCode;
    this.operand = opArray[1];
  }

  abstract execute(registermaschine: RmComponents): number | void;

  load(registermaschine: RmComponents): void {}

  continue() {
    return true;
  }

  toString(): string {
    return this.opString;
  }
}
