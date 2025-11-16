import { Component, effect, inject, OnInit, signal } from '@angular/core';
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
export class ControlsComponent implements OnInit {
  
  readonly error = signal<string | null>(null);
  readonly running = signal<boolean>(false);

  readonly #rmService = inject(RegistermaschineProviderService);
  readonly registermaschine = signal(this.#rmService.registermaschine);

  constructor() {
    effect(() => {
      const rm = this.registermaschine();
      if (!rm) return;
      rm.onRunningChanged((isRunning) => {
        this.running.set(isRunning);
      });
    });
  }
  ngOnInit(): void {
    this.reset();
  }

  step() {
    try {
      this.registermaschine().step();
    } catch (e) {
      this.error.set((e as Error).message);
    }
  }

  async run() {
    await this.registermaschine().run();
  }

  stop() {
    this.registermaschine().stop();
  }

  reset() {
    this.error.set(null);
    this.registermaschine().reset();
  }
}
