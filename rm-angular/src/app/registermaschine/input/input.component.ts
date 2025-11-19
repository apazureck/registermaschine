import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { IoDevice } from 'src/app/models/io-device';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgModel } from '@angular/forms';
import { firstValueFrom, Subject } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'rma-input',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIcon,
    MatButtonModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  public readonly inputDevice = input.required<IoDevice>();
  public readonly rmIsRunning = input.required<boolean>();
  public readonly inputValue = signal<number>(0);
  public readonly input = viewChild<ElementRef<HTMLInputElement>>('input');

  constructor() {
    effect(() => {
      const device = this.inputDevice();
      device.onChange((value: number) => {
        this.inputValue.set(value);
      });
      device.onBeforeValueRead(async () => {
        this.input()?.nativeElement.focus();
        this.input()?.nativeElement.select();
        if (this.rmIsRunning()) {
          await firstValueFrom(this.#continue$);
          const value = this.inputValue();
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

  #continue$ = new Subject<void>();

  continue(inputModel: NgModel) {
    if (!inputModel.valid) {
      return;
    }
    this.#continue$.next();
  }
}
