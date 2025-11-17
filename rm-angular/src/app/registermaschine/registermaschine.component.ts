import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ProgramCounterComponent } from './program-counter/program-counter.component';
import { AccumulatorComponent } from './accumulator/accumulator.component';
import { ProgramRegisterComponent } from './program-register/program-register.component';
import { AluComponent } from './alu/alu.component';
import { ProgramMemoryComponent } from './program-memory/program-memory.component';
import { DataMemoryComponent } from './data-memory/data-memory.component';
import { InputComponent } from './input/input.component';
import { OutputComponent } from './output/output.component';
import { RegistermaschineProviderService } from '../registermaschine-provider.service';
import { InputTarget } from '../models/io-device';

@Component({
  selector: 'rma-registermaschine',
  imports: [
    ProgramCounterComponent,
    AccumulatorComponent,
    ProgramRegisterComponent,
    AluComponent,
    ProgramMemoryComponent,
    DataMemoryComponent,
    InputComponent,
    OutputComponent,
  ],
  templateUrl: './registermaschine.component.html',
  styleUrl: './registermaschine.component.scss',
})
export class RegistermaschineComponent implements OnInit {
  readonly #rmService = inject(RegistermaschineProviderService);
  readonly registermaschine = signal(this.#rmService.registermaschine);
  readonly program = input.required<string>();
  readonly isRunning = signal<boolean>(false);
  readonly targetDataMemory = signal<boolean>(false);
  readonly targetAccumulator = signal<boolean>(false);
  #initialized = false;

  constructor() {
    effect(() => {
      const prog = this.program();
      if (!prog) return;
      const rm = this.registermaschine();
      if (!rm) return;
      rm.loadProgram(prog);
      if (!this.#initialized) {
        rm.reset();
        this.#initialized = true;
      }
    });

    effect(() => {
      const rm = this.registermaschine();
      if (!rm) return;
      rm.onRunningChanged((isRunning) => this.isRunning.set(isRunning));
      rm.inputDevice.onTargetChanged((target) => {
        if (target === InputTarget.DataMemory) {
          this.targetDataMemory.set(true);
          this.targetAccumulator.set(false);
        } else if (target === InputTarget.Accumulator) {
          this.targetDataMemory.set(false);
          this.targetAccumulator.set(true);
        } else {
          this.targetDataMemory.set(false);
          this.targetAccumulator.set(false);
        }
      });
    });
  }
  ngOnInit(): void {
    this.registermaschine().reset();
  }
}
