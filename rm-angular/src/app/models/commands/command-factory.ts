import { LoadConstantToAccumulatorCommand } from './akku-commands/load-constant-to-akku-command';
import { LoadToAkkuCommand } from './akku-commands/load-to-akku-command';
import { StoreFromAkkuCommand } from './akku-commands/store-from-akku-command';
import { AddCommand } from './alu-commands/add-command';
import { DivideCommand } from './alu-commands/divide-command';
import { MultiplyCommand } from './alu-commands/multiply-command';
import { SubtractCommand } from './alu-commands/subtract-command';
import { Command, CommandCode } from './command';
import { HaltCommand } from './halt-command';
import { InputCommand } from './io-commands/input-command';
import { OutputCommand } from './io-commands/output-command';
import { JumpEqualsZeroCommand } from './jump-commands/jump-eq-zero-command';

const registeredCommands: {
  [key in CommandCode]?: new (opString: string) => Command;
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
  [CommandCode.LoadToAccumulator]: LoadToAkkuCommand,
  [CommandCode.LoadConstantToAccumulator]: LoadConstantToAccumulatorCommand,
  [CommandCode.Multiply]: MultiplyCommand,
  [CommandCode.Output]: OutputCommand,
  [CommandCode.StoreFromAccumulator]: StoreFromAkkuCommand,
  [CommandCode.Subtract]: SubtractCommand,
};

export function registerCommand(
  commandCode: CommandCode,
  commandConstructor: new (opString: string) => Command
): void {
  registeredCommands[commandCode] = commandConstructor;
}

export function getCommand(commandString: string): Command {
  const newCommandFactory =
    registeredCommands[
      commandString.trim().split(' ')[0].toUpperCase() as CommandCode
    ];
  if (newCommandFactory) {
    return new newCommandFactory(commandString);
  }
  throw new Error(`Unknown command: ${commandString}`);
}
