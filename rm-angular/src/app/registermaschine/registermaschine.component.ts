import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  OnInit,
  output,
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
import { Target as IoTarget } from '../models/io-device';
import { AccuTarget } from '../models/accumulator';
import { DataOperation as DataOperation } from '../models/data-memory';
import { ProgramError } from '../models/program';
import { AluTarget } from '../models/alu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

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
  readonly IoTargetEnum = IoTarget;
  readonly AccuTargetEnum = AccuTarget;
  readonly AluTargetEnum = AluTarget;

  readonly #breakpointObserver = inject(BreakpointObserver);
  readonly showReducedRegistermaschine = toSignal(
    this.#breakpointObserver
      .observe("(max-width: 1200px)")
      .pipe(map((result) => result.matches)),
    { initialValue: false }
  );

  readonly #rmService = inject(RegistermaschineProviderService);
  readonly #hostElement = inject(ElementRef<HTMLElement>);
  readonly #hostObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const height = entry.contentRect.height;
      const width = entry.contentRect.width;
      const zoomHeight = height / 580;
      const zoomWidth = width / 750;
      if(this.showReducedRegistermaschine()) {
        this.zoom.set(1);
      } else {
        this.zoom.set(Math.min(zoomHeight, zoomWidth));
      }
    }
  });
  readonly memoryHeight = signal<string>('300px');
  readonly zoom = signal<number>(1);
  readonly displayStyle = input.required<'svg' | 'grid'>();

  readonly registermaschine = signal(this.#rmService.registermaschine);
  readonly program = input.required<string>();

  readonly isRunning = signal<boolean>(false);
  readonly inputTarget = signal<IoTarget | undefined>(undefined);
  readonly outputTarget = signal<IoTarget | undefined>(undefined);
  readonly dataOperation = signal<DataOperation | undefined>(undefined);
  readonly accuTarget = signal<AccuTarget | undefined>(undefined);
  readonly onError = output<ProgramError[] | undefined>();
  readonly aluTarget = signal<AluTarget | undefined>(undefined);
  #initialized = false;

  constructor() {
    this.#hostObserver.observe(this.#hostElement.nativeElement);

    effect(() => {
      this.onError.emit(undefined);
      const prog = this.program();
      if (!prog) return;
      const rm = this.registermaschine();
      if (!rm) return;
      try {
        rm.loadProgram(prog);
      } catch (error) {
        console.error('Error loading program:', error);
        this.onError.emit((error as Error).cause! as ProgramError[]);
      }
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
        this.inputTarget.set(target);
      });
      rm.outputDevice.onTargetChanged((target) => {
        this.outputTarget.set(target);
      });
      rm.dataMemory.onCellActive((index, operation) => {
        this.dataOperation.set(operation);
      });
      rm.accumulator.onTargetChanged((target) => {
        this.accuTarget.set(target);
      });
      rm.alu.onTargetChanged((target) => {
        this.aluTarget.set(target);
      });
    });

    effect(() => {
      console.log('Memory height set to:', this.memoryHeight());
    });
    effect(() => {
      console.log('Zoom set to:', this.zoom());
    });
  }
  ngOnInit(): void {
    this.registermaschine().reset();
  }
}
