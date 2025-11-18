import { RmComponents } from '../registermaschine';
import { LoadConstantToAccumulatorCommand } from './akku-commands/load-constant-to-akku-command';
import { LoadToAkkuCommand } from './akku-commands/load-to-akku-command';
import { StoreFromAkkuCommand } from './akku-commands/store-from-akku-command';
import { AddCommand } from './alu-commands/add-command';
import { DivideCommand } from './alu-commands/divide-command';
import { MultiplyCommand } from './alu-commands/multiply-command';
import { SubtractCommand } from './alu-commands/subtract-command';
import { Command, CommandCode } from './command';
import { HaltCommand } from './halt-command';
import { InvalidCommand } from './invalid-command';
import { InputCommand } from './io-commands/input-command';
import { OutputCommand } from './io-commands/output-command';
import { JumpCommand } from './jump-commands/jump-command';
import { JumpEqualsZeroCommand } from './jump-commands/jump-eq-zero-command';

const registeredCommands: {
  [key in CommandCode]?: new (rm: RmComponents, opString: string, editorLine: number, address: number) => Command;
} = {
  [CommandCode.Add]: AddCommand,
  [CommandCode.Divide]: DivideCommand,
  [CommandCode.Halt]: HaltCommand,
  [CommandCode.Input]: InputCommand,
  [CommandCode.JumpEqualsZero]: JumpEqualsZeroCommand,
  [CommandCode.JumpGreaterEqualsZero]: JumpEqualsZeroCommand,
  [CommandCode.JumpGreaterZero]: JumpEqualsZeroCommand,
  [CommandCode.JumpLessEqualsZero]: JumpEqualsZeroCommand,
  [CommandCode.JumpLessZero]: JumpEqualsZeroCommand,
  [CommandCode.JumpNotZero]: JumpEqualsZeroCommand,
  [CommandCode.Jump]: JumpCommand,
  [CommandCode.LoadToAccumulator]: LoadToAkkuCommand,
  [CommandCode.LoadConstantToAccumulator]: LoadConstantToAccumulatorCommand,
  [CommandCode.Multiply]: MultiplyCommand,
  [CommandCode.Output]: OutputCommand,
  [CommandCode.StoreFromAccumulator]: StoreFromAkkuCommand,
  [CommandCode.Subtract]: SubtractCommand,
};

export function getCommand(rm: RmComponents, commandString: string, editorLine: number, address: number): Command {
  try {
    const commandCode = commandString
      .trim()
      .split(' ')[0]
      .toUpperCase() as CommandCode;
    const commandCtor = registeredCommands[commandCode];

    // Odd error add is always undefined, handling it manually
    if(commandCode === CommandCode.Add) {
      return new AddCommand(rm, commandString, editorLine, address);
    }

    if (commandCtor) {
      const instance = new commandCtor(rm, commandString, editorLine, address);
      return instance;
    }
  } catch {}
  return new InvalidCommand(rm, commandString, editorLine, address);
}
