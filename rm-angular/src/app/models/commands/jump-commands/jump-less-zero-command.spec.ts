import { Registermaschine } from '../../registermaschine';
import { JumpLessZeroCommand } from './jump-less-zero-command';

describe('JumpEqZeroCommand', () => {
  it('should set program counter to target address if accumulator is less zero', () => {
    const rm = new Registermaschine();
    rm.accumulator.currentValue = -1;
    const jumpEqZeroCommand = new JumpLessZeroCommand(rm, 'JLZ 4', 1, 1);
    jumpEqZeroCommand.execute();
    expect(rm.programCounter.current).toBe(4);
  });

  it('increase if accumulator is greater zero', () => {
    const rm = new Registermaschine();
    rm.accumulator.currentValue = 5;
    const jumpEqZeroCommand = new JumpLessZeroCommand(rm, 'JLZ 4', 1, 1);
    jumpEqZeroCommand.execute();
    expect(rm.programCounter.current).toBe(1);
  });

  it('increase if accumulator is zero', () => {
    const rm = new Registermaschine();
    rm.accumulator.currentValue = 0;
    const jumpEqZeroCommand = new JumpLessZeroCommand(rm, 'JLZ 4', 1, 1);
    jumpEqZeroCommand.execute();
    expect(rm.programCounter.current).toBe(1);
  });
});
