import { Registermaschine } from '../../registermaschine';
import { InputCommand } from './input-command';

describe('InputCommand', () => {
  it('should load given value to memory', () => {
    const registermaschine = new Registermaschine();
    const inputCommand = new InputCommand(registermaschine, 'INP 5', 1, 1);

    registermaschine.inputDevice.value = 42;
    inputCommand.load();
    inputCommand.execute();

    expect(registermaschine.dataMemory.getValue(5)).toBe(42);
  });

  it('should load given value to accumulator if address is 0', () => {
    const registermaschine = new Registermaschine();
    const inputCommand = new InputCommand(registermaschine, 'INP 0', 1, 1);
    registermaschine.inputDevice.value = 99;

    inputCommand.load();
    inputCommand.execute();
    expect(registermaschine.accumulator.currentValue).toBe(99);
  });

  it('should throw error for invalid memory address', () => {
    const registermaschine = new Registermaschine();
    const inputCommand = new InputCommand(registermaschine, 'INP 300', 1, 1); // Assuming memory size is less than 300

    expect(() => inputCommand.load()).toThrowError(
      'Invalid memory address: 300'
    );
  });
});
