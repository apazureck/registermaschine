import { Registermaschine } from '../../registermaschine';
import { SubtractCommand } from './subtract-command';

describe('SubtractCommand', () => {
  it('should subtract value from data memory address from accumulator', () => {
    const registermaschine = new Registermaschine();
    registermaschine.dataMemory.setValue(2, 7);
    registermaschine.accumulator.currentValue = 10;
    const command = new SubtractCommand(registermaschine,'SUB 2');
    command.load();
    command.execute();
    expect(registermaschine.accumulator.currentValue).toBe(3);
  });

  it('should throw an error for invalid operand', () => {
    const registermaschine = new Registermaschine();
    const command = new SubtractCommand(registermaschine, 'SUB Y');
    expect(() => command.load()).toThrowError(
      'Invalid operand for SUB command: Y'
    );
  });
  it('should subtract value from accumulator, if address is zero', () => {
    const registermaschine = new Registermaschine();
    registermaschine.accumulator.currentValue = 10;
    const command = new SubtractCommand(registermaschine, 'SUB 0');
    command.load();
    command.execute();
    expect(registermaschine.accumulator.currentValue).toBe(0);
  });
});
