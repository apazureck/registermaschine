import { Component, effect, inject, input, signal } from '@angular/core';
import { IoDevice } from 'src/app/models/io-device';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { RequestInputValueComponent } from './request-input-value/request-input-value.component';

@Component({
  selector: 'rma-input',
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  #dialog = inject(MatDialog);
  public readonly inputDevice = input.required<IoDevice>();
  public readonly rmIsRunning = input.required<boolean>();
  public readonly inputValue = signal<number>(0);

  constructor() {
    effect(() => {
      const device = this.inputDevice();
      device.onChange((value: number) => {
        this.inputValue.set(value);
      });
      device.onBeforeValueRead(async () => {
        if (this.rmIsRunning()) {
          const value = await firstValueFrom(
            this.#dialog
              .open(RequestInputValueComponent, {
                data: this.inputValue(),
              })
              .afterClosed()
          );
          if (value !== undefined) {
            this.inputDevice().value = value;
            return true;
          }
        }
        return false;
      });
    });

    effect(() => {
      const inputValue = this.inputValue();
      const device = this.inputDevice();
      device.value = inputValue;
    });
  }
}
