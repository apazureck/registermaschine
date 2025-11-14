import { RmComponents } from '../../registermaschine';
import { Command, CommandCode, registerCommand } from '../command';

export class LoadConstantToAccumulatorCommand extends Command {
  override execute(registermaschine: RmComponents): void {
    const constantValue = parseInt(this.operand, 10);
    if (isNaN(constantValue)) {
      throw new Error(`Invalid constant value: ${this.operand}`);
    }
    registermaschine.accumulator.currentValue = constantValue;
  }
}

registerCommand(
  CommandCode.LoadConstantToAccumulator,
  LoadConstantToAccumulatorCommand
);
