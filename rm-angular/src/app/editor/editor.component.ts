import { Component } from '@angular/core';
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
  editorOptions = { theme: 'vs-dark', language: 'javascript' };
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';
}
