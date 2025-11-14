import { Command, CommandCode } from './commands';
import { ProgramMemory } from './program-memory';

describe('ProgramMemory', () => {
  it('should load and retrieve commands correctly', () => {
    const commands = [new Command('LDA 10'), new Command('STA 20')];
    const programMemory = new ProgramMemory(256);
    programMemory.loadCommands(commands);
    expect(programMemory.getCommand(0).code).toBe(
      CommandCode.LoadToAccumulator
    );
    expect(programMemory.getCommand(1).code).toBe(
      CommandCode.StoreFromAccumulator
    );
  });

  it('should return HLT 99 when accessing out of bounds', () => {
    const programMemory = new ProgramMemory(256);
    const haltCommand = programMemory.getCommand(1);
    expect(haltCommand.code).toBe(CommandCode.Halt);
    expect(haltCommand.operand).toBe('99');
  });
});
