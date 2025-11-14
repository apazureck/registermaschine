import { RmComponents } from '../../registermaschine';
import { Command, CommandCode, registerCommand } from '../command';

export class OutputCommand extends Command {
  override load(registermaschine: RmComponents): void {
    const address = parseInt(this.operand, 10);
    if (address < 0 || address >= registermaschine.dataMemory.size) {
      throw new Error(`Invalid memory address: ${address}`);
    }
  }
  override execute(registermaschine: RmComponents): void {
    const address = parseInt(this.operand, 10);
    if (address === 0) {
      registermaschine.outputDevice.value =
        registermaschine.accumulator.currentValue;
    } else {
      const value = registermaschine.dataMemory.getValue(address);
      registermaschine.outputDevice.value = value;
    }
  }
}

registerCommand(CommandCode.Output, OutputCommand);
