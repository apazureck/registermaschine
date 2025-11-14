import { RmComponents } from '../../registermaschine';
import { Command } from '../command';
import { CommandCode, registerCommand } from '../command';

export class SubtractCommand extends Command {
  override load(rm: RmComponents): void {
    const addressToSubtract = parseInt(this.operand);
    if (isNaN(addressToSubtract)) {
      throw new Error(`Invalid operand for SUB command: ${this.operand}`);
    }

    rm.alu.subtract(addressToSubtract);
  }

  override execute(rm: RmComponents): void {
    rm.alu.execute();
  }
}

registerCommand(CommandCode.Subtract, SubtractCommand);
