import { RmComponents } from '../registermaschine';
import { Command } from './command';

export class HaltCommand extends Command {
  override execute(rm: RmComponents): void {
    rm.programCounter.setAddress(rm.programCounter.current - 1);
  }

  override continue() {
    return false;
  }
}
