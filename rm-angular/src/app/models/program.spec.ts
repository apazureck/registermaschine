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

  it('should handle empty program', () => {
    const emptyProgram = `
    `;
    const program = new Program(emptyProgram);
    const commands = program.getCommandSet();
    expect(commands.length).toBe(0);
  });

  it('should parse prgram with tailing comments', () => {
    const programWithTailingComments = `
    LDA 10 ; Load value
    STA 20 ; Store value
    HLT 99 ; Halt program
    `;
    const program = new Program(programWithTailingComments);
    const commands = program.getCommandSet();
    expect(commands.map((cmd) => cmd.code)).toEqual([
      CommandCode.LoadToAccumulator,
      CommandCode.StoreFromAccumulator,
      CommandCode.Halt,
    ]);
  })
});
