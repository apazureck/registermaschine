import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, effect, input, signal } from '@angular/core';
import { DataMemory, DataOperation } from 'src/app/models/data-memory';

@Component({
  selector: 'rma-data-memory',
  templateUrl: './data-memory.component.html',
  styleUrl: './data-memory.component.scss',
  imports: [NgTemplateOutlet],
})
export class DataMemoryComponent {

  public DataOperation = DataOperation;

  public activeMemoryCell = signal<number | undefined>(undefined);
  public operation = signal<DataOperation | undefined>(undefined);
  public readonly dataMemory = input.required<DataMemory>();
  public readonly memory = computed(() => this.dataMemory().content);
  public readonly memoryContent = signal<ReadonlyArray<number>>([]);

  constructor() {
    effect(() => {
      const mem = this.dataMemory();
      this.memoryContent.set(mem.content);
      mem.onCellActive((i, t) => {
        if (i === undefined) {
          this.activeMemoryCell.set(undefined);
          this.operation.set(undefined);
          return;
        }
        this.activeMemoryCell.set(Math.max(i - 1, 0));
        this.operation.set(t);
      });
    });
  }
}
