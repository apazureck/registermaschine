import { AccuTarget } from '../../accumulator';
import { DataOperation } from '../../data-memory';
import { Command } from '../command';

export class StoreFromAkkuCommand extends Command {
  override load(): void {
    const address = parseInt(this.operand, 10);
    if (address < 0 || address >= this.rm.dataMemory.size) {
      throw new Error(`Invalid memory address: ${address}`);
    }
    this.rm.dataMemory.activateCell(address, DataOperation.Write);
    this.rm.accumulator.target = AccuTarget.DataMemoryWrite;
  }
  override execute(): void {
    const address = parseInt(this.operand, 10);
    this.rm.dataMemory.setValue(address, this.rm.accumulator.currentValue);
    this.rm.dataMemory.deactivateCell();
    this.rm.accumulator.target = undefined;
  }
}
