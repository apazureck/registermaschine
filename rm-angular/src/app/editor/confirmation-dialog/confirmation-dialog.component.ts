import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'rma-confirmation-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  readonly #data = signal<{ title: string; message: string; ok: string; cancel: string } | undefined>(inject(MAT_DIALOG_DATA) || undefined);
  readonly title = computed(() => this.#data()?.title || 'Bestätigung');
  readonly message = computed(() => this.#data()?.message || 'Sind Sie sicher?');
  readonly okText = computed(() => this.#data()?.ok || 'OK');
  readonly cancelText = computed(() => this.#data()?.cancel || 'Abbrechen');
}
