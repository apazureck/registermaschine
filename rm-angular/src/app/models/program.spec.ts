import { Program } from './program';
import { CommandCode } from './commands';

describe('Program', () => {
  beforeEach(() => {});

  it('should parse simple program', () => {
    const simpleProgram = `
    LDA 10
    STA 20
    `;
    const program = new Program(simpleProgram);
    const commands = program.getCommandSet();
    expect(commands.map((cmd) => cmd.code)).toEqual([
      CommandCode.LoadToAccumulator,
      CommandCode.StoreFromAccumulator,
    ]);
  });

  it('should ignore commented lines', () => {
    const programWithComments = `
    LDA 10
    STA 20
    ; This is a comment
    HLT 99
    `;
    const program = new Program(programWithComments);
    const commands = program.getCommandSet();
    expect(commands.map((cmd) => cmd.code)).toEqual([
      CommandCode.LoadToAccumulator,
      CommandCode.StoreFromAccumulator,
      CommandCode.Halt,
    ]);
  });
});
