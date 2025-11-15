import { Component, effect, input, signal } from '@angular/core';
import { IoDevice } from 'src/app/models/io-device';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'rma-input',
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  public readonly inputDevice = input.required<IoDevice>();
  public readonly inputValue = signal<number>(0);

  constructor() {
    effect(() => {
      const device = this.inputDevice();
      device.onChange((value: number) => {
        this.inputValue.set(value);
      });
    });

    effect(() => {
      const inputValue = this.inputValue();
      const device = this.inputDevice();
      device.value = inputValue;
    });
  }
}
