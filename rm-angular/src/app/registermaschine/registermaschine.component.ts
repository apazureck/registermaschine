import { Component, signal } from '@angular/core';
import { Registermaschine } from '../models/registermaschine';
import { ProgramCounterComponent } from './program-counter/program-counter.component';
import { AccumulatorComponent } from "./accumulator/accumulator.component";
import { ProgramRegisterComponent } from "./program-register/program-register.component";
import { AluComponent } from "./alu/alu.component";

@Component({
  selector: 'rma-registermaschine',
  imports: [ProgramCounterComponent, AccumulatorComponent, ProgramRegisterComponent, AluComponent],
  templateUrl: './registermaschine.component.html',
  styleUrl: './registermaschine.component.scss',
})
export class RegistermaschineComponent {

  registermaschine = signal(new Registermaschine());
}
