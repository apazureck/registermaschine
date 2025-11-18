export enum DataOperation {
  Read,
  Write,
}

export class DataMemory {
  reset() {
    this.deactivateCell();
  }
  deactivateCell() {
    this.activateCell(undefined);
  }
  #cellActiveCallbacks: Array<
    (index: number | undefined, isTarget: DataOperation | undefined) => void
  > = [];
  #memory: number[] = [];
  #activeCellIndex: number | undefined = undefined;
  operation: DataOperation | undefined = undefined;

  get content(): ReadonlyArray<number> {
    return this.#memory;
  }

  constructor(public size: number) {
    this.#memory = Array.from({ length: size }, () => 0);
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

  activateCell(
    address: number | undefined,
    operation: DataOperation | undefined = undefined
  ): void {
    this.#activeCellIndex = address;
    this.operation = operation;
    for (const callback of this.#cellActiveCallbacks) {
      try {
        callback(address, operation);
      } catch (e) {
        console.error('Error in cell active callback:', e);
      }
    }
  }

  onCellActive(
    activeCallback: (
      index: number | undefined,
      isTarget: DataOperation | undefined
    ) => void
  ) {
    this.#cellActiveCallbacks.push(activeCallback);
  }
  setSize(dataMemorySize: number) {
    this.size = dataMemorySize;
    while (this.#memory.length < dataMemorySize) {
      this.#memory.push(0);
    }
    while (this.#memory.length > dataMemorySize) {
      this.#memory.pop();
    }
  }
}
