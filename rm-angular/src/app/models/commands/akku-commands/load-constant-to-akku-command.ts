import { RmComponents } from '../../registermaschine';
import { Command } from '../command';

export class LoadConstantToAccumulatorCommand extends Command {
  override execute(registermaschine: RmComponents): void {
    const constantValue = parseInt(this.operand, 10);
    if (isNaN(constantValue)) {
      throw new Error(`Invalid constant value: ${this.operand}`);
    }
    registermaschine.accumulator.currentValue = constantValue;
  }
}
