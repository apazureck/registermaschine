import { RmComponents } from '../../registermaschine';
import { Command } from '../command';
import { CommandCode, registerCommand } from '../command';

export class LoadToAkkuCommand extends Command {
  override execute(registermaschine: RmComponents): void {
    const address = parseInt(this.operand, 10);
    const value = registermaschine.dataMemory.getValue(address);
    registermaschine.accumulator.currentValue = value;
  }
}

registerCommand(CommandCode.LoadToAccumulator, LoadToAkkuCommand);
