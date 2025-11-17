import { AccuTarget } from '../../accumulator';
import { DataOperation } from '../../data-memory';
import { Command } from '../command';

export class LoadToAkkuCommand extends Command {
  override load(): void {
    const address = parseInt(this.operand, 10);
    this.rm.dataMemory.activateCell(address, DataOperation.Read);
    this.rm.accumulator.target = AccuTarget.DataMemoryRead;
  }
  override execute(): void {
    const address = parseInt(this.operand, 10);
    const value = this.rm.dataMemory.getValue(address);
    this.rm.accumulator.currentValue = value;
  }

  override unload(): void {
    this.rm.dataMemory.deactivateCell();
    this.rm.accumulator.target = undefined;
  }
}
