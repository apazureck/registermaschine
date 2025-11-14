import { RmComponents } from '../../registermaschine';
import { Command } from '../command';

export class DivideCommand extends Command {
  override load(rm: RmComponents): void {
    const addressToDivide = parseInt(this.operand);
    if (isNaN(addressToDivide)) {
      throw new Error(`Invalid operand for DIV command: ${this.operand}`);
    }
    rm.alu.divide(addressToDivide);
  }
  override execute(rm: RmComponents): void {
    rm.alu.execute();
  }
}
