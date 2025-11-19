import { Registermaschine } from '../../registermaschine';
import { JumpGreaterZeroCommand } from './jump-greater-zero-command';

describe('JumpGreaterZeroCommand', () => {
  it('should jump to the target address if accumulator > 0', () => {
    const registermaschine = new Registermaschine();
    registermaschine.accumulator.currentValue = 5;
    const command = new JumpGreaterZeroCommand(registermaschine, 'JGZ 10', 1, 1);
    command.execute();
    expect(registermaschine.programCounter.current).toBe(10);
  });

  it('should increment program counter if accumulator <= 0', () => {
    const registermaschine = new Registermaschine();
    registermaschine.accumulator.currentValue = 0;
    const command = new JumpGreaterZeroCommand(registermaschine, 'JGZ 10', 1, 1);
    command.execute();
    expect(registermaschine.programCounter.current).toBe(1);
  });

  it('should throw an error for invalid jump address', () => {
    const registermaschine = new Registermaschine();
    const command = new JumpGreaterZeroCommand(registermaschine, 'JGZ -1', 1, 1);
    expect(() => command.execute()).toThrowError('Invalid jump address: -1');
  });

  it('should increment program counter if accumulator is zero', () => {
    const registermaschine = new Registermaschine();
    registermaschine.accumulator.currentValue = 0;
    const command = new JumpGreaterZeroCommand(registermaschine, 'JGZ 5', 1, 1);
    command.execute();
    expect(registermaschine.programCounter.current).toBe(1);
  });
});
