import { CommandCode } from './commands';
import { Registermaschine } from './registermaschine';

describe('Registermaschine', () => {
  it('should increment program counter on step', () => {
    const rm = new Registermaschine();
    rm.reset();
    rm.step();
    expect(rm.programCounter.current).toBe(1);
  });

  it('should reset program counter on reset', () => {
    const rm = new Registermaschine();
    rm.step();
    rm.reset();
    expect(rm.programCounter.current).toBe(0);
  });

  it('should load program into program memory', () => {
    const rm = new Registermaschine();
    const programCode = `
    LDA 10
    STA 20
    HLT 99
    `;
    rm.loadProgram(programCode);
    expect(rm.programMemory.getCommand(0)!.code).toBe(
      CommandCode.LoadToAccumulator
    );
    expect(rm.programMemory.getCommand(1)!.code).toBe(
      CommandCode.StoreFromAccumulator
    );
    expect(rm.programMemory.getCommand(2)!.code).toBe(CommandCode.Halt);
  });

  it('should reset program counter when loading a new program', () => {
    const rm = new Registermaschine();
    rm.step();
    expect(rm.programCounter.current).toBe(1);
    rm.loadProgram(`
      LDA 10
      HLT 99
    `);
    expect(rm.programCounter.current).toBe(0);
  });

  it('should run a simple program', () => {
    const rm = new Registermaschine();
    rm.loadProgram(`
      LDK 10
      STA 11
      ADD 11
      STA 12
      HLT 99
    `);
    rm.run();
    expect(rm.programCounter.current).toBe(4);
    expect(rm.dataMemory.getValue(11)).toBe(10);
    expect(rm.dataMemory.getValue(12)).toBe(20);
    expect(rm.accumulator.currentValue).toBe(20);
  });
});
