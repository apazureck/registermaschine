import { Component, computed, effect, input, signal } from '@angular/core';
import { ProgramMemory } from 'src/app/models/program-memory';
import { Command } from 'src/app/models/commands';
import { ProgramCounter } from 'src/app/models/program-counter';

@Component({
  selector: 'rma-program-memory',
  imports: [],
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
  public readonly currentProgramCounter = signal<number>(1);
  public readonly currentProgramIndex = computed(
    () => this.currentProgramCounter() - 1
  );
  #currentCommand = computed<Command | undefined>(() => {
    const pcIndex = this.currentProgramIndex();
    return this.#memoryContent()[pcIndex];
  });
  public readonly jumpTargetIndex = computed<number | undefined>(() => {
    const currentCommand = this.#currentCommand();
    if (!currentCommand) {
      return undefined;
    }

    const target = currentCommand.getJumpTargetAddress();
    if (target === undefined) {
      return undefined;
    }
    return target - 1;
  });

  public readonly jumpSourceIndex = computed<number | undefined>(() => {
    const currentCommand = this.#currentCommand();
    if (!currentCommand) {
      return undefined;
    }
    if (!currentCommand.isJumpCommand()) {
      return undefined;
    }
    return currentCommand.address - 1;
  });
  jump = computed<{ from: number; to: number } | undefined>(() => {
    const from = this.jumpSourceIndex()
    const to = this.jumpTargetIndex();
    if (from === undefined || to === undefined) {
      return undefined;
    }
    return { from, to };
  });

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
