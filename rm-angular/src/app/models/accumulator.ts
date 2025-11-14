export class Accumulator {
  #valueChangedSubscribers: ((value: number) => void)[] = [];
  #currentValue: number = 0;

  get currentValue(): number {
    return this.#currentValue;
  }
  set currentValue(value: number) {
    this.#currentValue = value;
    this.#valueChanged();
  }

  onValueChanged(callback: (value: number) => void) {
    this.#valueChangedSubscribers.push(callback);
  }

  #valueChanged() {
    for (const callback of this.#valueChangedSubscribers) {
      try {
        callback(this.#currentValue);
      } catch (e) {
        console.error('Error in accumulator value changed callback:', e);
      }
    }
  }
}
