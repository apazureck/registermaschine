import { RmComponents } from '../../registermaschine';
import { Command } from '../command';
import { CommandCode, registerCommand } from '../command';

export class InputCommand extends Command {
  override load(registermaschine: RmComponents): void {
    const address = parseInt(this.operand, 10);
    if (address < 0 || address >= registermaschine.dataMemory.size) {
      throw new Error(`Invalid memory address: ${address}`);
    }
  }
  override execute(registermaschine: RmComponents): void {
    const address = parseInt(this.operand, 10);
    if (address === 0) {
      registermaschine.accumulator.currentValue =
        registermaschine.inputDevice.value;
    } else {
      registermaschine.dataMemory.setValue(
        address,
        registermaschine.inputDevice.value
      );
    }
  }
}

registerCommand(CommandCode.Input, InputCommand);
