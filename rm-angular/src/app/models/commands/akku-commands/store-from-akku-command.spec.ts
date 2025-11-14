import { Registermaschine } from '../../registermaschine';
import { StoreFromAkkuCommand } from './store-from-akku-command';

describe('StoreFromAkkuCommand', () => {
  it('should store the value from the accumulator into the specified memory address', () => {
    const registermaschine = new Registermaschine();
    const command = new StoreFromAkkuCommand('STA 10');

    // Set the accumulator to a known value
    registermaschine.accumulator.currentValue = 42;
    // Execute the command
    command.execute(registermaschine);
    // Verify that the value was stored in memory
    const storedValue = registermaschine.dataMemory.getValue(10);
    expect(storedValue).toBe(42);
  });

  it('should handle negative values correctly', () => {
    const registermaschine = new Registermaschine();
    const command = new StoreFromAkkuCommand('STA 20');
    registermaschine.accumulator.currentValue = -15;
    command.execute(registermaschine);
    const storedValue = registermaschine.dataMemory.getValue(20);
    expect(storedValue).toBe(-15);
  });

  it('should overwrite existing values in memory', () => {
    const registermaschine = new Registermaschine();
    const command = new StoreFromAkkuCommand('STA 5');
    registermaschine.dataMemory.setValue(5, 100);
    registermaschine.accumulator.currentValue = 55;
    command.execute(registermaschine);
    const storedValue = registermaschine.dataMemory.getValue(5);
    expect(storedValue).toBe(55);
  });

  it('should throw an error for invalid memory addresses', () => {
    const registermaschine = new Registermaschine();
    const command = new StoreFromAkkuCommand('STA -1');
    registermaschine.accumulator.currentValue = 10;
    expect(() => command.execute(registermaschine)).toThrowError();
  });
});
