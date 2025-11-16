import { Registermaschine } from '../../registermaschine';
import { JumpNotZeroCommand } from './jump-not-zero-command';

describe('JumpNotZeroCommand', () => {
  it('should set program counter to target address if accumulator is non-zero', () => {
    const rm = new Registermaschine();
    // Set accumulator to non-zero
    rm.accumulator.currentValue = 5;
    const jumpNotZeroCommand = new JumpNotZeroCommand(rm, 'JNZ 4');
    jumpNotZeroCommand.execute();
    expect(rm.programCounter.current).toBe(4);
  });
  it('should increment program counter if accumulator is zero', () => {
    const rm = new Registermaschine();
    // Set accumulator to zero
    rm.accumulator.currentValue = 0;
    const jumpNotZeroCommand = new JumpNotZeroCommand(rm, 'JNZ 4');
    jumpNotZeroCommand.execute();
    expect(rm.programCounter.current).toBe(1);
  });
});
