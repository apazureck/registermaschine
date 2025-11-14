import { Registermaschine } from '../../registermaschine';
import { JumpEqZeroCommand } from './jump-eq-zero-command';

describe('JumpEqZeroCommand', () => {
  it('should set program counter to target address if accumulator is zero', () => {
    const rm = new Registermaschine();
    // Set accumulator to zero
    rm.accumulator.currentValue = 0;
    const jumpEqZeroCommand = new JumpEqZeroCommand('JEZ 4');
    jumpEqZeroCommand.execute(rm);
    expect(rm.programCounter.current).toBe(4);
  });

  it('increase if accumulator is non-zero', () => {
    const rm = new Registermaschine();
    // Set accumulator to non-zero
    rm.accumulator.currentValue = 5;
    const jumpEqZeroCommand = new JumpEqZeroCommand('JEZ 4');
    jumpEqZeroCommand.execute(rm);
    expect(rm.programCounter.current).toBe(1);
  });
});
