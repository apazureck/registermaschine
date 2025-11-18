import {
  Component,
  effect,
  inject,
  input,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
  MonacoEditorModule,
  NGX_MONACO_EDITOR_CONFIG,
  NgxMonacoEditorConfig,
  EditorComponent as MonacoEditorComponent,
} from 'ngx-monaco-editor-v2';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { debounceTime, firstValueFrom, Subject } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ProgramError } from '../models/program';
import { Range, editor as me } from 'monaco-editor';
import { RegistermaschineProviderService } from '../registermaschine-provider.service';
import { Command } from '../models/commands';

const glob_monacoConfig: NgxMonacoEditorConfig = {
  baseUrl:
    typeof window !== 'undefined'
      ? window.location.origin + '/assets/monaco/min/vs'
      : '', // bugfix for version 0.52. of monaco-editor
  defaultOptions: { glyphMargin: true },
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
    MatError,
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
  readonly #rmService = inject(RegistermaschineProviderService);
  #commandChanged = signal<Command | undefined>(undefined);
  #program = signal<Command[]>([]);
  readonly editor = signal<me.IStandaloneCodeEditor | undefined>(undefined);
  readonly editorOptions = { theme: 'vs-light', language: 'shell' };
  readonly code = model<string>('');
  readonly errors = input<ProgramError[] | undefined>();

  constructor() {
    this.#debouncedInput
      .pipe(takeUntilDestroyed(), debounceTime(1000))
      .subscribe((change) => {
        this.code.set(change);
        localStorage.setItem('editorContent', change);
      });

    effect(() => {
      const editor = this.editor();
      if (!editor) return;

      const command = this.#commandChanged();
      if (!command) return;

      this.#createCurrentLineGlyph(editor, command.editorLine);
    });

    effect(() => {
      const program = this.#program();
      const editor = this.editor();
      if (!editor) return;
      if (!program || program.length === 0) return;

      this.#createProgramGlyphs(editor, program);
    });

    this.#rmService.registermaschine.programRegister.onCurrentCommandChanged(
      (command) => {
        this.#commandChanged.set(command);
      }
    );

    this.#rmService.registermaschine.onProgramLoaded((commands) => {
      this.#program.set(commands);
    });
  }

  #createProgramGlyphs(editor: me.IStandaloneCodeEditor, program: Command[]) {
    this.removeOldProgramLineGlyphs(editor);
    for (const command of program) {
      const glyphWidget: me.IGlyphMarginWidget = {
        getDomNode: () => {
          const div = document.createElement('div');
          div.className = 'program-line-glyph';
          div.textContent = command.address.toString();
          return div;
        },
        getPosition: () => ({
          lane: me.GlyphMarginLane.Right,
          range: new Range(command.editorLine, 1, command.editorLine, 1),
          zIndex: 0,
        }),
        getId() {
          return `program-line-glyph-widget-${command.address}`;
        },
      };
      editor.addGlyphMarginWidget(glyphWidget);
    }
  }

  private removeOldProgramLineGlyphs(editor: me.IStandaloneCodeEditor) {
    const size = this.#rmService.registermaschine.programMemory.size;
    for (let address = 0; address < size; address++) {
      const glyphWidget: me.IGlyphMarginWidget = {
        getDomNode: () => {
          return document.createElement('div');
        },
        getPosition: () => {
          return {
            lane: me.GlyphMarginLane.Right,
            range: new Range(1, 1, 1, 1),
            zIndex: 0,
          };
        },
        getId() {
          return `program-line-glyph-widget-${address}`;
        },
      };
      editor.removeGlyphMarginWidget(glyphWidget);
    }
  }

  #createCurrentLineGlyph(
    editor: me.IStandaloneCodeEditor,
    lineNumber: number
  ) {
    const glyphWidget: me.IGlyphMarginWidget = {
      getDomNode: () => {
        const div = document.createElement('div');
        div.className = 'current-line-glyph';
        div.textContent = '▶';
        return div;
      },
      getPosition: () => ({
        lane: me.GlyphMarginLane.Left,
        range: new Range(lineNumber, 1, lineNumber, 1),
        zIndex: 0,
      }),
      getId() {
        return 'current-line-glyph-widget';
      },
    };
    editor.removeGlyphMarginWidget(glyphWidget);
    editor.addGlyphMarginWidget(glyphWidget);
  }

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

  #debouncedInput = new Subject<string>();

  editorInput(change: string) {
    this.#debouncedInput.next(change);
  }

  onMonacoInit($event: any) {
    throw new Error('Method not implemented.');
  }

  resetEditor() {
    this.code.set('');
  }

  ngOnInit(): void {
    this.code.set(localStorage.getItem('editorContent') || '');
  }
}
