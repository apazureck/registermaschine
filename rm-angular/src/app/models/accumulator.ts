export enum AccuTarget {
  DataMemoryRead,
  DataMemoryWrite,
  Alu,
  ConstantLoad,
}

export class Accumulator {
  reset() {
    this.target = undefined;
  }
  #valueChangedSubscribers: ((value: number) => void)[] = [];
  #targetChangedSubscribers: ((target: AccuTarget | undefined) => void)[] = [];
  #currentValue: number = 0;
  #target: AccuTarget | undefined = undefined;

  get currentValue(): number {
    return this.#currentValue;
  }
  set currentValue(value: number) {
    this.#currentValue = value;
    this.#valueChanged();
  }

  get target(): AccuTarget | undefined {
    return this.#target;
  }

  set target(target: AccuTarget | undefined) {
    this.#target = target;
    this.#targetChanged();
  }

  onValueChanged(callback: (value: number) => void) {
    this.#valueChangedSubscribers.push(callback);
  }

  onTargetChanged(callback: (target: AccuTarget | undefined) => void) {
    this.#targetChangedSubscribers.push(callback);
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

  #targetChanged() {
    for (const callback of this.#targetChangedSubscribers) {
      try {
        callback(this.#target);
      } catch (e) {
        console.error('Error in accumulator target changed callback:', e);
      }
    }
  }
}
