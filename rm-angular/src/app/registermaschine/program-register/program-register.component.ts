import { Component, effect, input, signal } from '@angular/core';
import { ProgramRegister } from 'src/app/models/program-register';
import { RegisterComponent } from '../register/register.component';
import { CommandCode } from 'src/app/models/commands';

@Component({
  selector: 'rma-program-register',
  imports: [RegisterComponent],
  templateUrl: './program-register.component.html',
  styleUrl: './program-register.component.scss',
})
export class ProgramRegisterComponent {
  programRegister = input.required<ProgramRegister>();
  value = signal<CommandCode>(CommandCode.Noop);

  constructor() {
    effect(() => {
      const pr = this.programRegister();
      pr.onCurrentCommandChanged((value) => {
        this.value.set(value.code);
      });
    });
  }
}
