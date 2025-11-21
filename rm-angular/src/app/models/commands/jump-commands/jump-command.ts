import { RmComponents } from '../../registermaschine';
import { Command } from '../command';

export class JumpCommand extends Command {
  override execute(): number {
    const targetAddress = parseInt(this.operand, 10);
    if (isNaN(targetAddress) || targetAddress < 0) {
      throw new Error(`Invalid jump address: ${this.operand}`);
    }
    this.rm.programCounter.setAddress(targetAddress);
    return targetAddress;
  }

  override getJumpTargetAddress(): number | undefined {
    const targetAddress = Number(this.operand);
    if (isNaN(targetAddress) || targetAddress < 0) {
      return undefined;
    }
    return targetAddress;
  }
}
