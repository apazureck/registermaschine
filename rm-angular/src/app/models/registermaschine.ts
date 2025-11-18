import { Accumulator } from './accumulator';
import { Alu } from './alu';
import { Command, CommandCode } from './commands';
import { DataMemory } from './data-memory';
import { IoDevice } from './io-device';
import { Program } from './program';
import { ProgramCounter } from './program-counter';
import { ProgramMemory } from './program-memory';
import { ProgramRegister } from './program-register';

export const accumulatorAddress = 0;

export interface RegistermaschineConfig {
  programMemorySize: 256;
  dataMemorySize: 256;
  clockFrequency: 2;
}

export const defaultRegistermaschineConfig: RegistermaschineConfig = {
  programMemorySize: 256,
  dataMemorySize: 256,
  clockFrequency: 2,
};

export interface RmComponents {
  readonly isRunning: boolean;
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
  clockFrequency: number = 2;
  #runningCallbacks: Array<(isRunning: boolean) => void> = [];
  #programLoadedCallbacks: Array<(commands: Command[]) => void> = [];
  constructor(settings?: RegistermaschineConfig) {
    if (settings) {
      this.programMemory.setSize(settings.programMemorySize);
      this.dataMemory.setSize(settings.dataMemorySize);
      this.clockFrequency = settings.clockFrequency;
    }
  }
  public readonly programMemory = new ProgramMemory(32);
  public readonly dataMemory = new DataMemory(16);
  public readonly accumulator = new Accumulator();
  public readonly programCounter = new ProgramCounter();
  public readonly programRegister: ProgramRegister = new ProgramRegister(
    this.programCounter,
    this.programMemory
  );
  public readonly alu = new Alu(this.dataMemory, this.accumulator);
  public readonly inputDevice = new IoDevice();
  public readonly outputDevice = new IoDevice();

  #stop = false;
  #running = false;

  public get isRunning(): boolean {
    return this.#running;
  }

  public async run(): Promise<void> {
    if (this.#stop) return;
    this.#running = true;
    this.#publishRunningChanged();
    if (this.programRegister.current.code === CommandCode.Halt) return;
    const wait = 1000 / this.clockFrequency;
    while (this.programRegister.current.continue() && !this.#stop) {
      await new Promise((resolve) => setTimeout(resolve, wait));
      await this.#stepInternal();
    }
    this.#stop = false;
    this.#running = false;
    this.#publishRunningChanged();
  }

  public stop(): void {
    this.#stop = true;
  }

  public step(): void {
    if (this.#running) return;

    this.#stepInternal();
  }

  async #stepInternal(): Promise<void> {
    if ((await this.programRegister.executeCurrentCommand()) === undefined)
      this.programCounter.increment();
  }

  public reset(): void {
    this.programCounter.reset();
    this.dataMemory.reset();
    this.inputDevice.reset();
    this.outputDevice.reset();
    this.accumulator.reset();
    this.alu.reset();
    this.programRegister.loadCurrentCommand();
    this.#stop = false;
  }

  public loadProgram(programCode: string) {
    this.programRegister.unloadCurrentCommand();
    const commands = new Program(programCode).getCommandSet(this);
    this.programMemory.loadCommands(commands);
    this.programRegister.loadCurrentCommand();
    this.#programLoaded(commands);
  }

  #programLoaded(commands: Command[]) {
    for (const callback of this.#programLoadedCallbacks) {
      try {
        callback(commands);
      } catch (error) {
        console.error('Error in program loaded callback:', error);
      }
    }
  }

  public onProgramLoaded(callback: (commands: Command[]) => void): void {
    this.#programLoadedCallbacks.push(callback);
  }

  public onRunningChanged(callback: (isRunning: boolean) => void): void {
    this.#runningCallbacks.push(callback);
  }

  #publishRunningChanged(): void {
    for (const callback of this.#runningCallbacks) {
      try {
        callback(this.#running);
      } catch (error) {
        console.error('Error in running changed callback:', error);
      }
    }
  }
}
