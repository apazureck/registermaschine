import { Accumulator } from './accumulator';
import { DataMemory } from './data-memory';
import { accumulatorAddress } from './registermaschine';

export interface AluStatus {
  readonly setOperation: AluOperation;
  readonly memoryInputIndex: number | undefined;
  readonly inputValue: number | undefined;
  readonly accuInputValue: number;
  readonly currentOutput: number;
}

export enum AluOperation {
  Noop = 'NOP',
  Add = 'ADD',
  Subtract = 'SUB',
  Multiply = 'MUL',
  Divide = 'DIV',
}

export enum AluTarget {
  DataMemory,
  Accumulator,
  None,
}

export class Alu implements AluStatus {
  #memory: DataMemory;
  #accumulator: Accumulator;
  #onChangedCallbacks: Array<(alu: AluStatus) => void> = [];
  #onTargetChangedCallbacks: Array<(target: AluTarget) => void> = [];
  #target: AluTarget | undefined = undefined;

  #setOperation: AluOperation = AluOperation.Noop;
  #memoryInputIndex: number | undefined = undefined;
  #currentOutput: number = 0;

  get setOperation(): AluOperation {
    return this.#setOperation;
  }

  get memoryInputIndex(): number | undefined {
    return this.#memoryInputIndex;
  }

  get target(): AluTarget | undefined {
    return this.#target;
  }

  set target(value: AluTarget | undefined) {
    this.#target = value;
    this.#publishTargetChanged();
  }

  get inputValue(): number | undefined {
    if (this.#memoryInputIndex === undefined) {
      return undefined;
    }
    return this.#memoryInputIndex === 0
      ? this.#accumulator.currentValue
      : this.#memory.getValue(this.#memoryInputIndex);
  }

  get accuInputValue() {
    return this.#accumulator.currentValue;
  }

  get currentOutput() {
    return this.#currentOutput;
  }

  constructor(memory: DataMemory, accumulator: Accumulator) {
    this.#memory = memory;
    this.#accumulator = accumulator;
    accumulator.onValueChanged(() => this.#publishChanged());
  }

  reset() {
    this.#setOperation = AluOperation.Noop;
    this.#memoryInputIndex = undefined;
    this.target = undefined;
  }

  subtract(addressToSubtract: number) {
    this.#setOperation = AluOperation.Subtract;
    this.#memoryInputIndex = addressToSubtract;
    this.#publishChanged();
  }
  multiply(addressToMultiply: number) {
    this.#setOperation = AluOperation.Multiply;
    this.#memoryInputIndex = addressToMultiply;
    this.#publishChanged();
  }
  divide(addressToDivide: number) {
    this.#setOperation = AluOperation.Divide;
    this.#memoryInputIndex = addressToDivide;
    this.#publishChanged();
  }
  add(addressToAdd: number) {
    this.#setOperation = AluOperation.Add;
    this.#memoryInputIndex = addressToAdd;
    this.#publishChanged();
  }

  public execute() {
    if (this.inputValue === undefined) {
      throw new Error('ALU execute called without input value set');
    }
    switch (this.setOperation) {
      case AluOperation.Add:
        this.#currentOutput = this.accuInputValue + this.inputValue;
        break;
      case AluOperation.Subtract:
        this.#currentOutput = this.accuInputValue - this.inputValue;
        break;
      case AluOperation.Multiply:
        this.#currentOutput = this.accuInputValue * this.inputValue;
        break;
      case AluOperation.Divide:
        if (this.inputValue === 0) {
          throw new Error('Division by zero error in DIV command');
        }
        this.#currentOutput = Math.floor(this.accuInputValue / this.inputValue);
        break;
      default:
        return;
    }
    this.#accumulator.currentValue = this.#currentOutput;
    this.#publishChanged();
  }

  onChanged(callback: (alu: AluStatus) => void) {
    this.#onChangedCallbacks.push(callback);
  }

  onTargetChanged(callback: (target: AluTarget) => void) {
    this.#onTargetChangedCallbacks.push(callback);
  }

  #publishChanged() {
    for (const callback of this.#onChangedCallbacks) {
      try {
        callback(this);
      } catch (error) {
        console.log('Error in ALU executed callback:', error);
      }
    }
  }

  #publishTargetChanged() {
    for (const callback of this.#onTargetChangedCallbacks) {
      try {
        callback(this.#target!);
      } catch (error) {
        console.log('Error in ALU target changed callback:', error);
      }
    }
  }
}
