import { Registermaschine } from '../../registermaschine';
import { LoadToAkkuCommand } from './load-to-akku-command';

describe('LoadToAkkuCommand', () => {
  it('should load value from data memory to accumulator', () => {
    const registermaschine = new Registermaschine();
    const testAddress = 5;
    const testValue = 42;
    registermaschine.dataMemory.setValue(testAddress, testValue);
    const command = new LoadToAkkuCommand(
      registermaschine,
      `LDA ${testAddress}`
    );

    command.execute();
    expect(registermaschine.accumulator.currentValue).toBe(testValue);
  });
  it('should load zero if data memory at address is zero', () => {
    const registermaschine = new Registermaschine();
    const testAddress = 10;
    registermaschine.dataMemory.setValue(testAddress, 0);
    const command = new LoadToAkkuCommand(registermaschine, `LDA ${testAddress}`);
    command.execute();
    expect(registermaschine.accumulator.currentValue).toBe(0);
  });
  it('should handle negative values', () => {
    const registermaschine = new Registermaschine();
    const testAddress = 15;
    const testValue = -7;
    registermaschine.dataMemory.setValue(testAddress, testValue);
    const command = new LoadToAkkuCommand(registermaschine, `LDA ${testAddress}`);
    command.execute();
    expect(registermaschine.accumulator.currentValue).toBe(testValue);
  });
  it('should throw error for invalid address', () => {
    const registermaschine = new Registermaschine();
    const invalidAddress = 9999;
    const command = new LoadToAkkuCommand(registermaschine, `LDA ${invalidAddress}`);
    expect(() => command.execute()).toThrowError();
  });
});
