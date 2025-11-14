import { DataMemory } from './data-memory';

describe('DataMemory', () => {
  it('should throw an error for out of bounds address', () => {
    const dataMemory = new DataMemory(10);
    expect(() => dataMemory.getValue(11)).toThrowError(
      'Memory address out of bounds: 11'
    );
    expect(() => dataMemory.getValue(-1)).toThrowError(
      'Memory address out of bounds: -1'
    );
  });

  it('shoud return value for initialized address', () => {
    const dataMemory = new DataMemory(10);
    // Directly manipulate private field for testing purposes
    dataMemory.setValue(3, 42); // Assuming a set method exists for testing
    expect(dataMemory.getValue(3)).toBe(42);
  });
});
