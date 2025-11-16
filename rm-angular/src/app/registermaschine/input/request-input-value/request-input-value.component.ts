import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'rma-request-input-value',
  imports: [MatDialogTitle, MatDialogModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './request-input-value.component.html',
  styleUrl: './request-input-value.component.scss',
})
export class RequestInputValueComponent {
  readonly value = signal<number>(inject(MAT_DIALOG_DATA));
}
