import { RmComponents } from '../../registermaschine';
import { Command } from '../command';

export class StoreFromAkkuCommand extends Command {
  override execute(): void {
    const address = parseInt(this.operand, 10);
    this.rm.dataMemory.setValue(address, this.rm.accumulator.currentValue);
  }
}
