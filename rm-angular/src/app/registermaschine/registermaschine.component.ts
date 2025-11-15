import { Component, effect, input, signal } from '@angular/core';
import { Registermaschine } from '../models/registermaschine';
import { ProgramCounterComponent } from './program-counter/program-counter.component';
import { AccumulatorComponent } from "./accumulator/accumulator.component";
import { ProgramRegisterComponent } from "./program-register/program-register.component";
import { AluComponent } from "./alu/alu.component";
import { ProgramMemoryComponent } from "./program-memory/program-memory.component";
import { DataMemoryComponent } from "./data-memory/data-memory.component";
import { InputComponent } from "./input/input.component";
import { OutputComponent } from "./output/output.component";

@Component({
  selector: 'rma-registermaschine',
  imports: [ProgramCounterComponent, AccumulatorComponent, ProgramRegisterComponent, AluComponent, ProgramMemoryComponent, DataMemoryComponent, InputComponent, OutputComponent],
  templateUrl: './registermaschine.component.html',
  styleUrl: './registermaschine.component.scss',
})
export class RegistermaschineComponent {
  readonly registermaschine = signal(new Registermaschine());
  readonly program = input.required<string>();

  constructor() {
    effect(() => {
      const prog = this.program();
      this.registermaschine().loadProgram(prog);
    });
  }
}
