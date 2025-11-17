import { DataOperation } from '../../data-memory';
import { Target } from '../../io-device';
import { Command } from '../command';

export class InputCommand extends Command {
  override load(): void {
    const address = parseInt(this.operand, 10);
    if (address < 0 || address >= this.rm.dataMemory.size) {
      throw new Error(`Invalid memory address: ${address}`);
    }
    if (address > 0) {
      this.rm.dataMemory.activateCell(address, DataOperation.Write);
    } else {
      this.rm.dataMemory.deactivateCell();
    }
    this.rm.inputDevice.target =
      address === 0 ? Target.AccumulatorWrite : Target.DataMemoryWrite;
  }
  override async execute(): Promise<void> {
    const address = parseInt(this.operand, 10);
    if (address === 0) {
      this.rm.accumulator.currentValue = await this.rm.inputDevice.readValue();
    } else {
      this.rm.dataMemory.setValue(
        address,
        await this.rm.inputDevice.readValue()
      );
    }
  }

  override unload(): void {
    this.rm.dataMemory.deactivateCell();
    this.rm.inputDevice.target = undefined;
  }
}
