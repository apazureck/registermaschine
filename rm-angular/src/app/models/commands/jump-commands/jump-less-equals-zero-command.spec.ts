import { Registermaschine } from '../../registermaschine';
import { JumpLessEqualsZeroCommand } from './jump-less-equals-zero-command';

describe('JumpLessEqualsZeroCommand', () => {
  it('should set program counter to target address if accumulator is less than zero', () => {
    const rm = new Registermaschine();
    rm.accumulator.currentValue = -5;
    const jumpLessEqualsZeroCommand = new JumpLessEqualsZeroCommand(
      rm,
      'JLEZ 4'
    );
    jumpLessEqualsZeroCommand.execute();
    expect(rm.programCounter.current).toBe(4);
  });

  it('should set program counter to target address if accumulator is zero', () => {
    const rm = new Registermaschine();
    rm.accumulator.currentValue = 0;
    const jumpLessEqualsZeroCommand = new JumpLessEqualsZeroCommand(
      rm,
      'JLEZ 4'
    );
    jumpLessEqualsZeroCommand.execute();
    expect(rm.programCounter.current).toBe(4);
  });

  it('should increment program counter if accumulator is greater than zero', () => {
    const rm = new Registermaschine();
    rm.accumulator.currentValue = 5;
    const jumpLessEqualsZeroCommand = new JumpLessEqualsZeroCommand(
      rm,
      'JLEZ 4'
    );
    jumpLessEqualsZeroCommand.execute();
    expect(rm.programCounter.current).toBe(1);
  });
});
