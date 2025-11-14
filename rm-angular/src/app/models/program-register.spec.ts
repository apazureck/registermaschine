import { CommandCode } from './commands';
import { Registermaschine } from './registermaschine';

describe('ProgramRegister', () => {
  it('should load next command on pc step', () => {
    const rm = new Registermaschine();

    rm.loadProgram(`
            LDA 10
            ADD 11
            STA 12
            HLT 99
        `);
    expect(rm.programRegister.current.code).toBe(CommandCode.LoadToAccumulator);
    rm.step();
    expect(rm.programRegister.current.code).toBe(CommandCode.Add);
    rm.step();
    expect(rm.programRegister.current.code).toBe(
      CommandCode.StoreFromAccumulator
    );
    rm.step();
    expect(rm.programRegister.current.code).toBe(CommandCode.Halt);
  });

  it('should notify subscribers on current command change', () => {
    const rm = new Registermaschine();
    const changedCommands: CommandCode[] = [];

    rm.programRegister.onCurrentCommandChanged((command) => {
      changedCommands.push(command.code);
    });

    rm.loadProgram(`
            LDA 10
            ADD 11
            STA 12
            HLT 99
        `);
    rm.step();
    rm.step();
    rm.step();
    
    expect(changedCommands).toEqual([
      CommandCode.LoadToAccumulator,
      CommandCode.Add,
      CommandCode.StoreFromAccumulator,
      CommandCode.Halt,
    ]);
  });
});
