import { Registermaschine } from '../../registermaschine';
import { AddCommand } from './add-command';

describe('AddCommand', () => {
  it('should add value from data memory to accumulator', () => {
    const registermaschine = new Registermaschine();
    registermaschine.dataMemory.setValue(2, 10);
    registermaschine.accumulator.currentValue = 5;
    const command = new AddCommand(registermaschine, 'ADD 2');
    command.load();
    command.execute();
    expect(registermaschine.accumulator.currentValue).toBe(15);
  });
  it('should throw an error for invalid operand', () => {
    const registermaschine = new Registermaschine();
    const command = new AddCommand(registermaschine, 'ADD X');
    expect(() => command.load()).toThrowError(
      'Invalid operand for ADD command: X'
    );
  });

  it('should add value from accumulator, if address is zero', () => {
    const registermaschine = new Registermaschine();
    registermaschine.accumulator.currentValue = 4;
    const command = new AddCommand(registermaschine, 'ADD 0');
    command.load();
    command.execute();
    expect(registermaschine.accumulator.currentValue).toBe(8);
  });
});
