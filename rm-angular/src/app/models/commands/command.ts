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

  public break: boolean = false;

  constructor(public rm: RmComponents, public opString: string, public readonly editorLine: number, public readonly address: number) {
    const opArray = opString.trim().split(' ');
    if (opArray.length !== 2) {
      throw new Error(`Invalid command string: ${opString}`);
    }
    this.code = opArray[0].toUpperCase() as CommandCode;
    this.operand = opArray[1];
  }

  abstract execute(): Promise<number | void> | number | void;

  load(): void {}

  unload(): void {}

  continue() {
    return true;
  }

  toString(): string {
    return this.opString;
  }
}
