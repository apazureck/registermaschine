import { AccuTarget } from '../../accumulator';
import { AluTarget } from '../../alu';
import { DataOperation } from '../../data-memory';
import { Command } from '../command';

export class SubtractCommand extends Command {
  override load(): void {
    const addressToSubtract = parseInt(this.operand);
    if (isNaN(addressToSubtract)) {
      throw new Error(`Invalid operand for SUB command: ${this.operand}`);
    }

    this.rm.alu.subtract(addressToSubtract);

    if (addressToSubtract === 0) {
      this.rm.accumulator.target = AccuTarget.Alu;
    } else {
      this.rm.dataMemory.activateCell(addressToSubtract, DataOperation.Read);
      this.rm.alu.target = AluTarget.DataMemory;
    }
  }

  override execute(): void {
    this.rm.alu.execute();
  }

  override unload(): void {
    this.rm.accumulator.target = undefined;
    this.rm.dataMemory.deactivateCell();
    this.rm.alu.target = undefined;
  }
}
