import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RegistermaschineProviderService } from '../registermaschine-provider.service';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'rma-controls',
  imports: [MatButtonModule, MatIcon, MatError],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
})
export class ControlsComponent {
  readonly error = signal<string | null>(null);
  reset() {
    this.error.set(null);
    this.registermaschine().reset();
  }
  readonly #rmService = inject(RegistermaschineProviderService);
  readonly registermaschine = signal(this.#rmService.registermaschine);
  step() {
    try {
      this.registermaschine().step();
    } catch (e) {
      this.error.set((e as Error).message);
    }
  }
}
