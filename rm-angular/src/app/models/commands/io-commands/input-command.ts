import { Command } from '../command';

export class InputCommand extends Command {
  override load(): void {
    const address = parseInt(this.operand, 10);
    if (address < 0 || address >= this.rm.dataMemory.size) {
      throw new Error(`Invalid memory address: ${address}`);
    }
    this.rm.dataMemory.activateCell(address);
  }
  override async execute(): Promise<void> {
    const address = parseInt(this.operand, 10);
    if (address === 0) {
      this.rm.accumulator.currentValue =
        await this.rm.inputDevice.readValue();
    } else {
      this.rm.dataMemory.setValue(
        address,
        await this.rm.inputDevice.readValue()
      );
    }
    this.rm.dataMemory.deactivateCell();
  }
}
