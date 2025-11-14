import { Registermaschine, RmComponents } from '../registermaschine';
import { AddCommand } from './alu-commands/add-command';

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

  execute(registermaschine: RmComponents): void {
    throw new Error('Method not implemented.');
  }

  load(registermaschine: RmComponents): void {}
}

const registeredCommands: {
  [key in CommandCode]?: new (opString: string) => Command;
} = {};

export function registerCommand(
  commandCode: CommandCode,
  commandConstructor: new (opString: string) => Command
): void {
  registeredCommands[commandCode] = commandConstructor;
}

export function getCommand(commandString: string): Command | undefined {
  const newCommandFactory =
    registeredCommands[
      commandString.trim().split(' ')[0].toUpperCase() as CommandCode
    ];
  if (newCommandFactory) {
    return new newCommandFactory(commandString);
  }
  throw new Error(`Unknown command: ${commandString}`);
}
