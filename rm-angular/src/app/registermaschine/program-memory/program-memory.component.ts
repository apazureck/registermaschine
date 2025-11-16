import { Component, computed, effect, input, signal } from '@angular/core';
import { MemoryComponent } from '../memory/memory.component';
import { ProgramMemory } from 'src/app/models/program-memory';
import { Command } from 'src/app/models/commands';
import { ProgramCounter } from 'src/app/models/program-counter';

@Component({
  selector: 'rma-program-memory',
  imports: [MemoryComponent],
  templateUrl: './program-memory.component.html',
  styleUrl: './program-memory.component.scss',
})
export class ProgramMemoryComponent {
  public readonly programMemory = input.required<ProgramMemory>();
  public readonly programCounter = input.required<ProgramCounter>();
  readonly #memoryContent = signal<ReadonlyArray<Command | undefined>>([]);
  public readonly memoryContent = computed(() =>
    this.#memoryContent().map((cmd) => cmd?.toString() ?? '---')
  );
  public readonly currentProgramCounter = signal<number | undefined>(undefined);

  constructor() {
    effect(() => {
      const mem = this.programMemory();
      this.#memoryContent.set(mem.content);
      mem.onMemoryUpdated(() => {
        this.#memoryContent.set([...mem.content]);
      });
    });

    effect(() => {
      const pc = this.programCounter();
      pc.onStep((cur) => {
        this.currentProgramCounter.set(cur);
      });
    });
  }
}
