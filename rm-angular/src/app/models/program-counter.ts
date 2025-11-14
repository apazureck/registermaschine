export class ProgramCounter {
  #stepSubscribers: ((currentAddress: number) => void)[] = [];
  #currentAddress: number = 0;
  get current(): number {
    return this.#currentAddress;
  }
  reset() {
    this.#currentAddress = 0;
    this.#stepped();
  }
  increment() {
    this.#currentAddress++;
    this.#stepped();
  }
  setAddress(targetAddress: number) {
    this.#currentAddress = targetAddress;
    this.#stepped();
  }
  onStep(callback: (currentCount: number) => void) {
    this.#stepSubscribers.push(() => callback(this.#currentAddress));
  }
  #stepped() {
    for (const callback of this.#stepSubscribers) {
      try {
        callback(this.#currentAddress);
      } catch (e) {
        console.error('Error in step callback:', e);
      }
    }
  }
}
