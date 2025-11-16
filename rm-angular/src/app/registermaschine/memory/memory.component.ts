import { Component, computed, effect, input } from '@angular/core';

@Component({
  selector: 'rma-memory',
  imports: [],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.scss',
})
export class MemoryComponent {
  public readonly offset = input<number>(1);
  public readonly memory = input.required<ReadonlyArray<any>>();
  public readonly label = input.required<string>();
  public readonly highlightInput = input<number | undefined>(undefined, {
    alias: 'highlight',
  });
  public readonly highlightEntry = computed(() => {
    const hi = this.highlightInput();
    if (hi === undefined) {
      return undefined;
    }
    return hi - this.offset();
  });
}
