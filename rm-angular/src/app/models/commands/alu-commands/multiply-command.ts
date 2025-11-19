import { AccuTarget } from '../../accumulator';
import { AluTarget } from '../../alu';
import { DataOperation } from '../../data-memory';
import { RmComponents } from '../../registermaschine';
import { Command } from '../command';

export class MultiplyCommand extends Command {
  override load(): void {
    const addressToMultiply = parseInt(this.operand);
    if (isNaN(addressToMultiply)) {
      throw new Error(`Invalid operand for MUL command: ${this.operand}`);
    }

    this.rm.alu.multiply(addressToMultiply);
    if (addressToMultiply === 0) {
      this.rm.accumulator.target = AccuTarget.Alu;
    } else {
      this.rm.dataMemory.activateCell(addressToMultiply, DataOperation.Read);
      this.rm.alu.target = AluTarget.DataMemory;
    }
  }
  override execute(): void {
    this.rm.alu.execute();
  }
  override unload(): void {
    this.rm.accumulator.target = undefined;
    this.rm.dataMemory.deactivateCell();
    this.rm.alu.reset();
  }
}
