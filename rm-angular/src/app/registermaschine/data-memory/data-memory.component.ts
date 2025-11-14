import { Component, effect, input, signal } from '@angular/core';
import { DataMemory } from 'src/app/models/data-memory';
import { MemoryComponent } from '../memory/memory.component';

@Component({
  selector: 'rma-data-memory',
  imports: [MemoryComponent],
  templateUrl: './data-memory.component.html',
  styleUrl: './data-memory.component.scss',
})
export class DataMemoryComponent {
  public readonly dataMemory = input.required<DataMemory>();
  public readonly memoryContent = signal<ReadonlyArray<number>>([]);

  constructor() {
    effect(() => {
      const mem = this.dataMemory();
      this.memoryContent.set(mem.content);
    });
  }
}
