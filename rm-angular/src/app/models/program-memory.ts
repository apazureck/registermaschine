import { Command } from './commands';
import { HaltCommand } from './commands/halt-command';

export class ProgramMemory {
  readonly #memory: Command[] = [];
  get content() {
    return this.#memory;
  }

  constructor(public size: number) {
    this.#memory = Array.from(
      { length: size },
      () => new HaltCommand('HLT 99')
    );
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
  }
  getCommand(currentCount: number): Command {
    if (!this.#memory[currentCount]) {
      console.error(
        `ProgramMemory: No command at address ${currentCount}, returning HLT 99`
      );
      return new HaltCommand('HLT 99');
    }
    return this.#memory[currentCount];
  }
  #clearMemory() {
    this.#memory.length = 0;
  }
}
