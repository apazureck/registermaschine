import { Registermaschine } from '../../registermaschine';
import { InputCommand } from './input-command';

describe('InputCommand', () => {
  it('should load given value to memory', () => {
    const registermaschine = new Registermaschine();
    const inputCommand = new InputCommand('INP 5');

    registermaschine.inputDevice.value = 42;
    inputCommand.load(registermaschine);
    inputCommand.execute(registermaschine);

    expect(registermaschine.dataMemory.getValue(5)).toBe(42);
  });

  it('should load given value to accumulator if address is 0', () => {
    const registermaschine = new Registermaschine();
    const inputCommand = new InputCommand('INP 0');
    registermaschine.inputDevice.value = 99;

    inputCommand.load(registermaschine);
    inputCommand.execute(registermaschine);
    expect(registermaschine.accumulator.currentValue).toBe(99);
  });

  it('should throw error for invalid memory address', () => {
    const registermaschine = new Registermaschine();
    const inputCommand = new InputCommand('INP 300'); // Assuming memory size is less than 300

    expect(() => inputCommand.load(registermaschine)).toThrowError(
      'Invalid memory address: 300'
    );
  });
});
