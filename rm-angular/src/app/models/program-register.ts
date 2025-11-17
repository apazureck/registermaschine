import { Command as Command } from './commands';
import { ProgramCounter } from './program-counter';
import { ProgramMemory } from './program-memory';

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
      this.loadCurrentCommand();
    });
  }

  loadCurrentCommand(): void {
    if(this.#currentCommand) {
      this.#currentCommand.unload();
    }
    this.#currentCommand = this.#programMemory.getCommand(
      this._programCounter.current
    );
    this.#currentCommand?.load();
    this.#currentCommandChanged();
  }

  unloadCurrentCommand() {
    this.#currentCommand?.unload();
  }

  public async executeCurrentCommand(): Promise<number | void> {
    this.#currentCommand!.load();
    const result = await this.#currentCommand!.execute();
    return result;
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
