import { Component, effect, input, signal } from '@angular/core';
import { Accumulator } from 'src/app/models/accumulator';
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'rma-accumulator',
  imports: [RegisterComponent],
  templateUrl: './accumulator.component.html',
  styleUrl: './accumulator.component.scss',
})
export class AccumulatorComponent {
  public readonly accumulator = input.required<Accumulator>();
  public readonly value = signal<number>(0);

  constructor() {
    effect(() => {
      const acc = this.accumulator();
      acc.onValueChanged((value) => {
        this.value.set(value);
      });
    });
  }
}
