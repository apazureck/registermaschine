import { Command } from './commands';
import { HaltCommand } from './commands/halt-command';
import { InvalidCommand } from './commands/invalid-command';

export class ProgramMemory {
  setSize(programMemorySize: number) {
    this.size = programMemorySize;
    while (this.#memory.length > programMemorySize) {
      this.#memory.pop();
    }
    while (this.#memory.length < programMemorySize) {
      this.#memory.push(undefined);
    }
    this.#memoryUpdated();
  }
  readonly #memory: (Command | undefined)[] = [];
  readonly #memoryUpdatedCallbacks: Array<() => void> = [];
  get content() {
    return this.#memory;
  }

  constructor(public size: number) {
    this.#memory = Array.from({ length: size }, () => undefined);
  }

  loadCommands(commands: Command[]) {
    this.#clearMemory();

    let i = 0;
    for (const command of commands) {
      if (i >= this.size) {
        break;
      }
      this.#memory.push(command);
      i++;
    }
    this.#memoryUpdated();
  }
  #memoryUpdated() {
    for (const callback of this.#memoryUpdatedCallbacks) {
      try {
        callback();
      } catch (error) {
        console.error('Error in memory updated callback:', error);
      }
    }
  }
  onMemoryUpdated(callback: () => void) {
    this.#memoryUpdatedCallbacks.push(callback);
  }
  getCommand(currentCount: number): Command | undefined {
    if (currentCount < 1 || currentCount > this.size) {
      console.error(
        `ProgramMemory: Address ${currentCount} out of bounds, returning HLT 99`
      );
      return new InvalidCommand(undefined as any, '99', -1, currentCount);
    }
    const i = currentCount - 1;
    if (!this.#memory[i]) {
      console.error(
        `ProgramMemory: No command at address ${currentCount}, returning HLT 99`
      );
      return undefined;
    }
    return this.#memory[i];
  }
  #clearMemory() {
    this.#memory.length = 0;
  }
}
