import { RmComponents } from '../../registermaschine';
import { Command } from '../command';

export class OutputCommand extends Command {
  override load(): void {
    const address = parseInt(this.operand, 10);
    if (address < 0 || address >= this.rm.dataMemory.size) {
      throw new Error(`Invalid memory address: ${address}`);
    }
  }
  override execute(): void {
    const address = parseInt(this.operand, 10);
    if (address === 0) {
      this.rm.outputDevice.value = this.rm.accumulator.currentValue;
    } else {
      const value = this.rm.dataMemory.getValue(address);
      this.rm.outputDevice.value = value;
    }
  }
}
