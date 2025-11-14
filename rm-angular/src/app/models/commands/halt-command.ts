import { RmComponents } from '../registermaschine';
import { Command } from './command';

export class HaltCommand extends Command {
  override execute(rm: RmComponents): void {}
}
