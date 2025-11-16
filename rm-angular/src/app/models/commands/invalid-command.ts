import { RmComponents } from '../registermaschine';
import { Command } from './command';

export class InvalidCommand extends Command {
  
  constructor(opString: string) {
    try {
        super(opString);
    } catch {
        
    }
  }

  override execute(registermaschine: RmComponents): void {
    throw new Error('Invalid Command cannot be executed.');
  }
}
