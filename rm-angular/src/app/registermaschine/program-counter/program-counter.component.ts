import { Component, effect, input, signal } from '@angular/core';
import { ProgramCounter } from 'src/app/models/program-counter';
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'rma-program-counter',
  imports: [RegisterComponent],
  templateUrl: './program-counter.component.html',
  styleUrl: './program-counter.component.scss',
})
export class ProgramCounterComponent {
  public readonly programCounter = input.required<ProgramCounter>();
  public readonly current = signal<number>(0);
  /**
   *
   */
  constructor() {
    effect(() => {
      const pc = this.programCounter();
      pc.onStep((value) => {
        this.current.set(value);
      });
    });
  }
}
