import { Command } from "./commands";

export class ProgramMemory {
  #memory: Command[] = [];
  constructor(public size: number) {}
}
