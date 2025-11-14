import { Registermaschine } from '../../registermaschine';
import { MultiplyCommand } from './multiply-command';

describe('MultiplyCommand', () => {
  it('should multiply the accumulator by the value from data memory at the given address', () => {
    const registermaschine = new Registermaschine();
    registermaschine.dataMemory.setValue(3, 4);
    registermaschine.accumulator.currentValue = 5;
    const command = new MultiplyCommand('MUL 3');
    command.load(registermaschine);
    command.execute(registermaschine);
    expect(registermaschine.accumulator.currentValue).toBe(20);
  });

  it('should throw an error for invalid operand', () => {
    const registermaschine = new Registermaschine();
    const command = new MultiplyCommand('MUL X');
    expect(() => command.load(registermaschine)).toThrowError(
      'Invalid operand for MUL command: X'
    );
  });

  it('should multiply accumulator by zero if data memory value is zero', () => {
    const registermaschine = new Registermaschine();
    registermaschine.accumulator.currentValue = 10;
    const command = new MultiplyCommand('MUL 0');
    command.load(registermaschine);
    command.execute(registermaschine);
    expect(registermaschine.accumulator.currentValue).toBe(100);
  });
});
