import { Component, inject, model, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MonacoEditorModule,
  NGX_MONACO_EDITOR_CONFIG,
  NgxMonacoEditorConfig,
} from 'ngx-monaco-editor-v2';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

const glob_monacoConfig: NgxMonacoEditorConfig = {
  baseUrl:
    typeof window !== 'undefined'
      ? window.location.origin + '/assets/monaco/min/vs'
      : '', // bugfix for version 0.52. of monaco-editor
};

@Component({
  selector: 'rma-editor',
  imports: [
    MonacoEditorModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIcon,
    MatDialogModule,
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  providers: [
    {
      provide: NGX_MONACO_EDITOR_CONFIG,
      useValue: glob_monacoConfig,
    },
  ],
})
export class EditorComponent implements OnInit {
  readonly #httpClient = inject(HttpClient);
  readonly #dialog = inject(MatDialog);
  readonly editorOptions = { theme: 'vs-light', language: 'shell' };
  readonly code = model<string>('');

  async loadExample(fileName: string) {
    if (!fileName) return;

    const confirmed = await firstValueFrom(
      this.#dialog
        .open(ConfirmationDialogComponent, {
          data: {
            title: 'Beispiel laden',
            message:
              'Wollen Sie den aktuellen Code verwerfen und das Beispiel laden?',
            ok: 'Ja',
            cancel: 'Nein',
          },
        })
        .afterClosed()
    );

    if (!confirmed) return;

    const data = await firstValueFrom(
      this.#httpClient.get(`assets/examples/${fileName}`, {
        responseType: 'text',
      })
    );

    this.code.set(data);
  }

  saveText() {
    const blob = new Blob([this.code()], { type: 'text/plain' });
    const fileUrl = window.URL.createObjectURL(blob);
    // create new div from document
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', fileUrl);
    downloadLink.setAttribute('download', 'program.asm');
    downloadLink.click();
  }

  loadText(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        this.code.set(text);
      }
    };
    reader.readAsText(file);
  }

  editorInput(change: string) {
    localStorage.setItem('editorContent', change);
  }

  resetEditor() {
    this.code.set('');
  }

  ngOnInit(): void {
    this.code.set(localStorage.getItem('editorContent') || '');
  }
}
