import { RmComponents } from '../registermaschine';
import { Command } from './command';

export class InvalidCommand extends Command {
  constructor(rm: RmComponents, opString: string) {
    try {
      super(rm, opString);
    } catch {}
  }

  override execute(): void {
    throw new Error('Invalid Command cannot be executed.');
  }

  override continue() {
    return false;
  }
}
