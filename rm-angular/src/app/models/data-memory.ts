export class DataMemory {
  #memory: number[] = [];

  get content(): ReadonlyArray<number> {
    return this.#memory;
  }

  constructor(public size: number) {
    this.#memory = new Array(size);
  }

  getValue(address: number): number {
    if (address < 1 || address >= this.size + 1) {
      throw new Error(`Memory address out of bounds: ${address}`);
    }
    const value = this.#memory[address - 1];
    if (value === undefined) {
      throw new Error(`Memory address not initialized: ${address}`);
    }
    return value;
  }

  setValue(address: number, value: number): void {
    if (address < 1 || address >= this.size + 1) {
      throw new Error(`Memory address out of bounds: ${address}`);
    }
    this.#memory[address - 1] = value;
  }
}
