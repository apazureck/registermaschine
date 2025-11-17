import { DataOperation } from '../../data-memory';
import { Target } from '../../io-device';
import { Command } from '../command';

export class OutputCommand extends Command {
  override load(): void {
    const address = parseInt(this.operand, 10);
    if (address < 0 || address >= this.rm.dataMemory.size) {
      throw new Error(`Invalid memory address: ${address}`);
    }
    if (address > 0) {
      this.rm.dataMemory.activateCell(address, DataOperation.Read);
      this.rm.outputDevice.target = Target.DataMemoryRead;
    } else {
      this.rm.outputDevice.target = Target.AccumulatorRead;
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

  override unload(): void {
    this.rm.outputDevice.target = undefined;
    this.rm.dataMemory.deactivateCell();
  }
}
