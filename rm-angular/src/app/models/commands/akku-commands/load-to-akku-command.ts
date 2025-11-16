import { RmComponents } from '../../registermaschine';
import { Command } from '../command';

export class LoadToAkkuCommand extends Command {
  override execute(): void {
    const address = parseInt(this.operand, 10);
    const value = this.rm.dataMemory.getValue(address);
    this.rm.accumulator.currentValue = value;
  }
}
