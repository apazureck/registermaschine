export class IoDevice {
  #value = 0;
  #valueChangedCallbacks: Array<(newValue: number) => void> = [];

  get value(): number {
    return this.#value;
  }

  set value(val: number) {
    this.#value = val;
    this.#publishChange();
  }

  onChange(callback: (newValue: number) => void): void {
    this.#valueChangedCallbacks.push(callback);
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
