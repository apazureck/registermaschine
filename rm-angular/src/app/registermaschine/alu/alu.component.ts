import { Component, input } from '@angular/core';
import { Alu } from 'src/app/models/alu';

@Component({
  selector: 'rma-alu',
  imports: [],
  templateUrl: './alu.component.html',
  styleUrl: './alu.component.scss',
})
export class AluComponent {
  readonly alu = input.required<Alu>();
}
