import { InputTarget } from '../../io-device';
import { Command } from '../command';

export class InputCommand extends Command {
  override load(): void {
    const address = parseInt(this.operand, 10);
    if (address < 0 || address >= this.rm.dataMemory.size) {
      throw new Error(`Invalid memory address: ${address}`);
    }
    if (address > 0) {
      this.rm.dataMemory.activateCell(address);
    }
    this.rm.inputDevice.target =
      address === 0 ? InputTarget.Accumulator : InputTarget.DataMemory;
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
    this.rm.dataMemory.deactivateCell();
  }
}
