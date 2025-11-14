import { Registermaschine } from '../../registermaschine';
import { LoadConstantToAccumulatorCommand } from './load-constant-to-akku-command';

describe('LoadConstantToAccumulatorCommand', () => {
  it('should load a valid constant into the accumulator', () => {
    const registermaschine = new Registermaschine();
    const command = new LoadConstantToAccumulatorCommand('LDK 42');

    command.execute(registermaschine);
    expect(registermaschine.accumulator.currentValue).toBe(42);
  });

  it('should throw an error for an invalid constant', () => {
    const registermaschine = new Registermaschine();
    const command = new LoadConstantToAccumulatorCommand('LDK invalid');
    expect(() => command.execute(registermaschine)).toThrowError(
      'Invalid constant value: invalid'
    );
  });
});
