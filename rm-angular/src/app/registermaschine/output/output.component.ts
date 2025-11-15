import { Component, effect, input, signal } from '@angular/core';
import { IoDevice } from 'src/app/models/io-device';
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'rma-output',
  imports: [RegisterComponent],
  templateUrl: './output.component.html',
  styleUrl: './output.component.scss',
})
export class OutputComponent {
  public readonly outputDevice = input.required<IoDevice>();
  public readonly outputValue = signal<number>(0);

  constructor() {
    effect(() => {
      const out = this.outputDevice();
      out.onChange((val) => {
        this.outputValue.set(val);
      });
    });
  }
}
