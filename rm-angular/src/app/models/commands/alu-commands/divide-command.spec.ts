import { Registermaschine } from '../../registermaschine';
import { DivideCommand } from './divide-command';

describe('DivideCommand', () => {
  it('should divide the accumulator by the value from data memory at the given address', () => {
    const registermaschine = new Registermaschine();
    registermaschine.dataMemory.setValue(3, 4);
    registermaschine.accumulator.currentValue = 20;
    const command = new DivideCommand(registermaschine, 'DIV 3', 1, 1);
    command.load();
    command.execute();
    expect(registermaschine.accumulator.currentValue).toBe(5);
  });

  it('should throw an error for invalid operand', () => {
    const registermaschine = new Registermaschine();
    const command = new DivideCommand(registermaschine, 'DIV Z', 1, 1);
    expect(() => command.load()).toThrowError(
      'Invalid operand for DIV command: Z'
    );
  });

  it('should throw error when divided by 0', () => {
    const registermaschine = new Registermaschine();
    registermaschine.dataMemory.setValue(3, 0);
    registermaschine.accumulator.currentValue = 10;
    const command = new DivideCommand(registermaschine, 'DIV 3', 1, 1);
    command.load();
    expect(() => command.execute()).toThrowError(
      'Division by zero error in DIV command'
    );
  });

  it('should return 0 when accu is 0', () => {
    const registermaschine = new Registermaschine();
    registermaschine.accumulator.currentValue = 0;
    registermaschine.dataMemory.setValue(9, 10);
    const command = new DivideCommand(registermaschine, 'DIV 10', 1, 1);
    command.execute();
    expect(registermaschine.accumulator.currentValue).toBe(0);
  });

  it('should return 1 when accu is divided by itself', () => {
    const registermaschine = new Registermaschine();
    registermaschine.accumulator.currentValue = 15;
    const command = new DivideCommand(registermaschine, 'DIV 0', 1, 1);
    command.load();
    command.execute();
    expect(registermaschine.accumulator.currentValue).toBe(1);
  });

  it('should throw error when accu is 0 and is divided by itself', () => {
    const registermaschine = new Registermaschine();
    registermaschine.accumulator.currentValue = 0;
    const command = new DivideCommand(registermaschine, 'DIV 0', 1, 1);
    command.load();
    expect(() => command.execute()).toThrowError(
      'Division by zero error in DIV command'
    );
  });
});
