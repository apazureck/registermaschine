import { RmComponents } from '../../registermaschine';
import { Command } from '../command';

export class DivideCommand extends Command {
  override load(): void {
    const addressToDivide = parseInt(this.operand);
    if (isNaN(addressToDivide)) {
      throw new Error(`Invalid operand for DIV command: ${this.operand}`);
    }
    this.rm.alu.divide(addressToDivide);
  }
  override execute(): void {
    this.rm.alu.execute();
  }
}
