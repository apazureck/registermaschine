import { Component, input } from '@angular/core';

@Component({
  selector: 'rma-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public readonly label = input.required<string>();
  public readonly value = input.required<any>();
}
