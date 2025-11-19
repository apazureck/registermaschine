import { Registermaschine } from '../../registermaschine';
import { CommandCode } from '../command';
import { JumpCommand } from './jump-command';

describe('JumpCommand', () => {
  it('should set program counter to target address on execute', () => {
    const rm = new Registermaschine();
    rm.loadProgram(`
      LDA 15
      STA 1
      LDA 10
      MUL 1
    `);
    const jumpCommand = new JumpCommand(rm, 'JMP 3', 1, 1);
    jumpCommand.execute();
    expect(rm.programCounter.current).toBe(3);
    expect(rm.programRegister.current.code).toBe(CommandCode.Multiply);
  });

  it('should throw error for invalid jump address', () => {
    const rm = new Registermaschine();
    const jumpCommand = new JumpCommand(rm, 'JMP XYZ', 1, 1);
    expect(() => jumpCommand.execute()).toThrowError(
      'Invalid jump address: XYZ'
    );
  });

  it('should return hlt when command is out of bounds', () => {
    const rm = new Registermaschine();
    rm.loadProgram(`
      LDA 10
      STA 20
    `);
    const outOfBoundsCommand = rm.programMemory.getCommand(5);
    expect(outOfBoundsCommand!.code).toBe(CommandCode.Halt);
    expect(outOfBoundsCommand!.operand).toBe('99');
  });
});
