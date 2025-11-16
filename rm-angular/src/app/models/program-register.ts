import { Command as Command } from './commands';
import { HaltCommand } from './commands/halt-command';
import { ProgramCounter } from './program-counter';
import { ProgramMemory } from './program-memory';
import { RmComponents } from './registermaschine';

export class ProgramRegister {
  #currentCommand: Command = new HaltCommand('HLT 99');
  #currentCommandSubscribers: ((command: Command) => void)[] = [];
  readonly #programMemory: ProgramMemory;

  get current(): Command {
    return this.#currentCommand;
  }

  constructor(programCounter: ProgramCounter, programMemory: ProgramMemory) {
    this.#programMemory = programMemory;

    programCounter.onStep((currentCount) => {
      this.#currentCommand = programMemory.getCommand(currentCount);
      this.#currentCommandChanged();
    });
  }

  public executeCurrentCommand(registermaschine: RmComponents): number | void {
    this.#currentCommand.load(registermaschine);
    return this.#currentCommand.execute(registermaschine);
  }

  #currentCommandChanged() {
    for (const callback of this.#currentCommandSubscribers) {
      try {
        callback(this.#currentCommand);
      } catch (e) {
        console.error('Error in current command changed callback:', e);
      }
    }
  }

  onCurrentCommandChanged(callback: (command: Command) => void) {
    this.#currentCommandSubscribers.push(callback);
  }
}
