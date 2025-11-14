import { Component, computed, effect, input, signal } from '@angular/core';
import { MemoryComponent } from "../memory/memory.component";
import { ProgramMemory } from 'src/app/models/program-memory';
import { Command } from 'src/app/models/commands';

@Component({
  selector: 'rma-program-memory',
  imports: [MemoryComponent],
  templateUrl: './program-memory.component.html',
  styleUrl: './program-memory.component.scss',
})
export class ProgramMemoryComponent {
  public readonly programMemory = input.required<ProgramMemory>();
  readonly #memoryContent = signal<ReadonlyArray<Command>>([]);
  public readonly memoryContent = computed(() => this.#memoryContent().map(cmd => cmd.toString()));

  constructor() {
    effect(() => {
      const mem = this.programMemory();
      this.#memoryContent.set(mem.content);
    })
  }
}
