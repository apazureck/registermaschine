import { Registermaschine } from '../../registermaschine';
import { OutputCommand } from './output-command';

describe('OutputCommand', () => {
  it('should load given value to memory', () => {
    const registermaschine = new Registermaschine();

    registermaschine.dataMemory.setValue(5, 42);
    const outputCommand = new OutputCommand('OUT 5');

    outputCommand.load(registermaschine);
    outputCommand.execute(registermaschine);

    expect(registermaschine.outputDevice.value).toBe(42);
  });

  it('should load given value to accumulator if address is 0', () => {
    const registermaschine = new Registermaschine();

    registermaschine.accumulator.currentValue = 99;
    const outputCommand = new OutputCommand('OUT 0');

    outputCommand.load(registermaschine);
    outputCommand.execute(registermaschine);

    expect(registermaschine.outputDevice.value).toBe(99);
  });

  it('should throw error for invalid memory address', () => {
    const registermaschine = new Registermaschine();
    const outputCommand = new OutputCommand('OUT 300'); // Assuming memory size is less than 300

    expect(() => outputCommand.load(registermaschine)).toThrowError(
      'Invalid memory address: 300'
    );
  });
});
