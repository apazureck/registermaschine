export class IoDevice {
  #value = 0;
  #valueChangedCallbacks: Array<(newValue: number) => void> = [];
  #valueReadCallbacks: Array<() => Promise<boolean>> = [];

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
