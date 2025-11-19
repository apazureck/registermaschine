import { Command } from '../command';

export class JumpLessZeroCommand extends Command {
  override execute(): number | void {
    const targetAddress = parseInt(this.operand);
    if (isNaN(targetAddress) || targetAddress < 0) {
      throw new Error(`Invalid jump address: ${this.operand}`);
    }
    if (this.rm.accumulator.currentValue < 0) {
      this.rm.programCounter.setAddress(targetAddress);
      return targetAddress;
    }
  }
}
