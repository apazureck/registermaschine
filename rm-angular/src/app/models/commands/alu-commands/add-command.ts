import { RmComponents } from '../../registermaschine';
import { Command } from '../command';

export class AddCommand extends Command {
  override load(): void {
    const addressToAdd = parseInt(this.operand);
    if (isNaN(addressToAdd)) {
      throw new Error(`Invalid operand for ADD command: ${this.operand}`);
    }
    this.rm.alu.add(addressToAdd);
  }
  override execute(): void {
    this.rm.alu.execute();
  }
}
