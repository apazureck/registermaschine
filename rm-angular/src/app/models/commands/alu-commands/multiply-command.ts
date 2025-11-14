import { RmComponents } from '../../registermaschine';
import { Command } from '../command';

export class MultiplyCommand extends Command {
  override load(rm: RmComponents): void {
    const addressToMultiply = parseInt(this.operand);
    if (isNaN(addressToMultiply)) {
      throw new Error(`Invalid operand for MUL command: ${this.operand}`);
    }

    rm.alu.multiply(addressToMultiply);
  }
  override execute(rm: RmComponents): void {
    rm.alu.execute();
  }
}
