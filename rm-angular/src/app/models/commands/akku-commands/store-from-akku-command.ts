import { RmComponents } from '../../registermaschine';
import { Command } from '../command';
import { CommandCode, registerCommand } from '../command';

export class StoreFromAkkuCommand extends Command {
  override execute(registermaschine: RmComponents): void {
    const address = parseInt(this.operand, 10);
    registermaschine.dataMemory.setValue(
      address,
      registermaschine.accumulator.currentValue
    );
  }
}

registerCommand(CommandCode.StoreFromAccumulator, StoreFromAkkuCommand);
