import { RmComponents } from '../registermaschine';
import { Command } from './command';

export class InvalidCommand extends Command {
  constructor(rm: RmComponents, opString: string, editorLine: number, address: number) {
    try {
      super(rm, opString, editorLine, address);
    } catch {}
  }

  override execute(): void {
    throw new Error('Invalid Command cannot be executed.');
  }

  override continue() {
    return false;
  }
}
