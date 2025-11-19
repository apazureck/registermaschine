import { Registermaschine } from '../../registermaschine';
import { LoadConstantToAccumulatorCommand } from './load-constant-to-akku-command';

describe('LoadConstantToAccumulatorCommand', () => {
  it('should load a valid constant into the accumulator', () => {
    const registermaschine = new Registermaschine();
    const command = new LoadConstantToAccumulatorCommand(registermaschine, 'LDK 42', 1, 1);

    command.execute();
    expect(registermaschine.accumulator.currentValue).toBe(42);
  });

  it('should throw an error for an invalid constant', () => {
    const registermaschine = new Registermaschine();
    const command = new LoadConstantToAccumulatorCommand(registermaschine, 'LDK invalid', 1, 1);
    expect(() => command.execute()).toThrowError(
      'Invalid constant value: invalid'
    );
  });
});
