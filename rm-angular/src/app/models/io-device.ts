export enum Target {
  DataMemoryWrite = 'DataMemoryWrite',
  AccumulatorWrite = 'AccumulatorWrite',
  DataMemoryRead = 'DataMemoryRead',
  AccumulatorRead = 'AccumulatorRead',
}

export class IoDevice {
  #value = 0;
  #valueChangedCallbacks: Array<(newValue: number) => void> = [];
  #targetCallbacks: Array<(target: Target | undefined) => void> = [];
  #valueReadCallbacks: Array<() => Promise<boolean>> = [];
  #target: Target | undefined;

  get target(): Target | undefined {
    return this.#target;
  }

  set target(target: Target | undefined) {
    this.#target = target;
    for (const callback of this.#targetCallbacks) {
      try {
        callback(target);
      } catch (error) {
        console.error('Error in target callback:', error);
      }
    }
  }

  get value(): number {
    return this.#value;
  }

  async readValue(): Promise<number> {
    const results = await Promise.all(
      this.#valueReadCallbacks.map((cb) => cb())
    );
    return this.#value;
  }

  set value(val: number) {
    this.#value = val;
    this.#publishChange();
  }

  onBeforeValueRead(arg0: () => Promise<boolean>) {
    this.#valueReadCallbacks.push(arg0);
  }

  onChange(callback: (newValue: number) => void): void {
    this.#valueChangedCallbacks.push(callback);
  }

  onTargetChanged(callback: (target: Target | undefined) => void) {
    this.#targetCallbacks.push(callback);
  }

  #publishChange(): void {
    for (const callback of this.#valueChangedCallbacks) {
      try {
        callback(this.#value);
      } catch (error) {
        console.error('Error in valueChanged callback:', error);
      }
    }
  }
}
