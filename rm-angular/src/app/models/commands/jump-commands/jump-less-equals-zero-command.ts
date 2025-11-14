import { RmComponents } from '../../registermaschine';
import { Command } from '../command';

export class JumpLessEqualsZeroCommand extends Command {
  override execute(rm: RmComponents): void {
    const targetAddress = parseInt(this.operand);
    if (isNaN(targetAddress) || targetAddress < 0) {
      throw new Error(`Invalid jump address: ${this.operand}`);
    }
    if (rm.accumulator.currentValue <= 0) {
      rm.programCounter.setAddress(targetAddress);
    } else {
      rm.programCounter.increment();
    }
  }
}
