import { Alu } from "./alu";
import { Command } from "./commands";
import { DataMemory } from "./data-memory";
import { Program } from "./program";
import { ProgramMemory } from "./program-memory";

export const accumulatorAddress = 0;

export class Accumulator {
  #currentValue: number = 0;
}

class ProgramCounter {
  reset() {
    throw new Error("Method not implemented.");
  }
  increment() {
    throw new Error("Method not implemented.");
  }
  #currentAddress: number = 0;
}

class ProgramRegister {
  #currentCommand: Command = new Command("HLT 99");
}

export class Registermaschine {
  readonly #programMemory = new ProgramMemory(256);
  readonly #dataMemory = new DataMemory(256);
  readonly #accumulator = new Accumulator();
  readonly #programCounter = new ProgramCounter();
  readonly #programRegister = new ProgramRegister();
  readonly #alu = new Alu();

  public step(): void {
    this.#programCounter.increment();
  }

  public reset(): void {
    this.#programCounter.reset();
  }

  public loadProgram(programCode: string) {
    const commands = new Program(programCode).getCommandSet();
  }
}
