import { Command as Command } from './commands';
import { HaltCommand } from './commands/halt-command';
import { ProgramCounter } from './program-counter';
import { ProgramMemory } from './program-memory';
import { RmComponents } from './registermaschine';

export class ProgramRegister {
  #currentCommand: Command | undefined = undefined;
  #currentCommandSubscribers: ((command: Command) => void)[] = [];
  readonly #programMemory: ProgramMemory;

  get current(): Command {
    if (!this.#currentCommand) {
      throw new Error('No current command loaded');
    }
    return this.#currentCommand;
  }

  constructor(
    private _programCounter: ProgramCounter,
    programMemory: ProgramMemory
  ) {
    this.#programMemory = programMemory;

    this._programCounter.onStep((currentCount) => {
      this.#currentCommand = programMemory.getCommand(currentCount);
      this.#currentCommandChanged();
      this.#currentCommand?.load();
    });
  }

  loadCurrentCommand(rm: RmComponents): void {
    this.#currentCommand = this.#programMemory.getCommand(
      this._programCounter.current
    );
    this.#currentCommand?.load();
    this.#currentCommandChanged();
  }

  public async executeCurrentCommand(): Promise<number | void> {
    this.#currentCommand!.load();
    return await this.#currentCommand!.execute();
  }

  #currentCommandChanged() {
    if (!this.#currentCommand) {
      return;
    }
    for (const callback of this.#currentCommandSubscribers) {
      try {
        callback(this.#currentCommand!);
      } catch (e) {
        console.error('Error in current command changed callback:', e);
      }
    }
  }

  onCurrentCommandChanged(callback: (command: Command) => void) {
    this.#currentCommandSubscribers.push(callback);
  }
}
