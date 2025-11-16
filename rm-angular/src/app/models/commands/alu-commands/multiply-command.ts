import { RmComponents } from '../../registermaschine';
import { Command } from '../command';

export class MultiplyCommand extends Command {
  override load(): void {
    const addressToMultiply = parseInt(this.operand);
    if (isNaN(addressToMultiply)) {
      throw new Error(`Invalid operand for MUL command: ${this.operand}`);
    }

    this.rm.alu.multiply(addressToMultiply);
  }
  override execute(): void {
    this.rm.alu.execute();
  }
}
