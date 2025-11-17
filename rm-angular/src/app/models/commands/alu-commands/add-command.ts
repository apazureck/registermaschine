import { AccuTarget } from '../../accumulator';
import { AluTarget } from '../../alu';
import { DataOperation } from '../../data-memory';
import { RmComponents } from '../../registermaschine';
import { Command } from '../command';

export class AddCommand extends Command {
  constructor(rm: RmComponents, operand: string) {
    super(rm, operand);
  }
  override load(): void {
    const addressToAdd = parseInt(this.operand);
    if (isNaN(addressToAdd)) {
      throw new Error(`Invalid operand for ADD command: ${this.operand}`);
    }
    this.rm.alu.add(addressToAdd);
    if (addressToAdd === 0) {
      this.rm.accumulator.target = AccuTarget.Alu;
    } else {
      this.rm.dataMemory.activateCell(addressToAdd, DataOperation.Read);
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
