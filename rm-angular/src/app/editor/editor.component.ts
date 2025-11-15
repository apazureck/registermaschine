import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MonacoEditorModule,
  NGX_MONACO_EDITOR_CONFIG,
  NgxMonacoEditorConfig,
} from 'ngx-monaco-editor-v2';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

const glob_monacoConfig: NgxMonacoEditorConfig = {
  baseUrl:
    typeof window !== 'undefined'
      ? window.location.origin + '/assets/monaco/min/vs'
      : '', // bugfix for version 0.52. of monaco-editor
};

@Component({
  selector: 'rma-editor',
  imports: [MonacoEditorModule, FormsModule, MatSelectModule, MatButtonModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  providers: [
    {
      provide: NGX_MONACO_EDITOR_CONFIG,
      useValue: glob_monacoConfig,
    },
  ],
})
export class EditorComponent {
  editorOptions = { theme: 'vs-light', language: 'shell' };
  code = model('LDK 10\nSTA 01\nHLT 99');

  saveText() {
    const blob = new Blob([this.code()], { type: 'text/plain' });
    const fileUrl = window.URL.createObjectURL(blob);
    // create new div from document
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', fileUrl);
    downloadLink.setAttribute('download', 'program.asm');
    downloadLink.click();
  }

  loadText() {
    // <input type="file" class="file-input"
    //  (change)="onFileSelected($event)" #fileUpload>

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.asm,.txt';
    fileInput.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          this.code.set(text);
        }
      };
      reader.readAsText(file);
    };
    fileInput.click();
  }
}
