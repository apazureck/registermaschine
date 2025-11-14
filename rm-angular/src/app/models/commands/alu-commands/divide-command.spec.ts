import { Registermaschine } from '../../registermaschine';
import { DivideCommand } from './divide-command';

describe('DivideCommand', () => {
  it('should divide the accumulator by the value from data memory at the given address', () => {
    const registermaschine = new Registermaschine();
    registermaschine.dataMemory.setValue(3, 4);
    registermaschine.accumulator.currentValue = 20;
    const command = new DivideCommand('DIV 3');
    command.load(registermaschine);
    command.execute(registermaschine);
    expect(registermaschine.accumulator.currentValue).toBe(5);
  });

  it('should throw an error for invalid operand', () => {
    const registermaschine = new Registermaschine();
    const command = new DivideCommand('DIV Z');
    expect(() => command.load(registermaschine)).toThrowError(
      'Invalid operand for DIV command: Z'
    );
  });

  it('should throw error when divided by 0', () => {
    const registermaschine = new Registermaschine();
    registermaschine.dataMemory.setValue(3, 0);
    registermaschine.accumulator.currentValue = 10;
    const command = new DivideCommand('DIV 3');
    command.load(registermaschine);
    expect(() => command.execute(registermaschine)).toThrowError(
      'Division by zero error in DIV command'
    );
  });

  it('should return 0 when accu is 0', () => {
    const registermaschine = new Registermaschine();
    registermaschine.accumulator.currentValue = 0;
    registermaschine.dataMemory.setValue(9, 10);
    const command = new DivideCommand('DIV 10');
    command.execute(registermaschine);
    expect(registermaschine.accumulator.currentValue).toBe(0);
  });

  it('should return 1 when accu is divided by itself', () => {
    const registermaschine = new Registermaschine();
    registermaschine.accumulator.currentValue = 15;
    const command = new DivideCommand('DIV 0');
    command.load(registermaschine);
    command.execute(registermaschine);
    expect(registermaschine.accumulator.currentValue).toBe(1);
  });

  it('should throw error when accu is 0 and is divided by itself', () => {
    const registermaschine = new Registermaschine();
    registermaschine.accumulator.currentValue = 0;
    const command = new DivideCommand('DIV 0');
    command.load(registermaschine);
    expect(() => command.execute(registermaschine)).toThrowError(
      'Division by zero error in DIV command'
    );
  });
});
