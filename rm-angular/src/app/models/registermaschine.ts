import { Accumulator } from './accumulator';
import { Alu } from './alu';
import { CommandCode } from './commands';
import { DataMemory } from './data-memory';
import { IoDevice } from './io-device';
import { Program } from './program';
import { ProgramCounter } from './program-counter';
import { ProgramMemory } from './program-memory';
import { ProgramRegister } from './program-register';

export const accumulatorAddress = 0;

export interface RmComponents {
  readonly programMemory: ProgramMemory;
  readonly dataMemory: DataMemory;
  readonly accumulator: Accumulator;
  readonly programCounter: ProgramCounter;
  readonly programRegister: ProgramRegister;
  readonly alu: Alu;
  readonly inputDevice: IoDevice;
  readonly outputDevice: IoDevice;
}

export class Registermaschine implements RmComponents {
  public readonly programMemory = new ProgramMemory(256);
  public readonly dataMemory = new DataMemory(256);
  public readonly accumulator = new Accumulator();
  public readonly programCounter = new ProgramCounter();
  public readonly programRegister = new ProgramRegister(
    this.programCounter,
    this.programMemory
  );
  public readonly alu = new Alu(this.dataMemory, this.accumulator);
  public readonly inputDevice = new IoDevice();
  public readonly outputDevice = new IoDevice();

  public run(): void {
    while (this.programRegister.current.code !== CommandCode.Halt) {
      this.loadCurrentCommand();
      this.executeCurrentCommand();
      this.step();
    }
  }

  public step(): void {
    this.programCounter.increment();
  }

  public loadCurrentCommand(): void {
    this.programRegister.current.load(this);
  }

  public executeCurrentCommand(): void {
    const command = this.programRegister.current;
    command.execute(this);
  }

  public reset(): void {
    this.programCounter.reset();
  }

  public loadProgram(programCode: string) {
    const commands = new Program(programCode).getCommandSet();
    this.programMemory.loadCommands(commands);
    this.programCounter.reset();
  }
}
