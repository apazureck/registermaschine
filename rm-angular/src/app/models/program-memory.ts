import { Command } from './commands';

export class ProgramMemory {
  readonly #memory: Command[] = [];

  constructor(public size: number) {}

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
      return new Command('HLT 99');
    }
    return this.#memory[currentCount];
  }
  #clearMemory() {
    this.#memory.length = 0;
  }
}
