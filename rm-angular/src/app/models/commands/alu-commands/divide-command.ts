import { AccuTarget } from '../../accumulator';
import { AluTarget } from '../../alu';
import { DataOperation } from '../../data-memory';
import { Command } from '../command';

export class DivideCommand extends Command {
  override load(): void {
    const addressToDivide = parseInt(this.operand);
    if (isNaN(addressToDivide)) {
      throw new Error(`Invalid operand for DIV command: ${this.operand}`);
    }
    this.rm.alu.divide(addressToDivide);
    if (addressToDivide === 0) {
      this.rm.accumulator.target = AccuTarget.Alu;
    } else {
      this.rm.dataMemory.activateCell(addressToDivide, DataOperation.Read);
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
