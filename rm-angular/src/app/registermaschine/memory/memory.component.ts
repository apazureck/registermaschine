import { Component, input } from '@angular/core';

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
}
