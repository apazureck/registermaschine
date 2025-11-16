import { RmComponents } from '../../registermaschine';
import { Command } from '../command';

export class SubtractCommand extends Command {
  override load(): void {
    const addressToSubtract = parseInt(this.operand);
    if (isNaN(addressToSubtract)) {
      throw new Error(`Invalid operand for SUB command: ${this.operand}`);
    }

    this.rm.alu.subtract(addressToSubtract);
  }

  override execute(): void {
    this.rm.alu.execute();
  }
}
