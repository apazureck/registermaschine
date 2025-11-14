import { RmComponents } from '../../registermaschine';
import { Command, CommandCode, registerCommand } from '../command';

export class AddCommand extends Command {
  override load(rm: RmComponents): void {
    const addressToAdd = parseInt(this.operand);
    if (isNaN(addressToAdd)) {
      throw new Error(`Invalid operand for ADD command: ${this.operand}`);
    }
    rm.alu.add(addressToAdd);
  }
  override execute(rm: RmComponents): void {
    rm.alu.execute();
  }
}

registerCommand(CommandCode.Add, AddCommand);
