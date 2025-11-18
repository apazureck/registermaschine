import { Component, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RegistermaschineComponent } from './registermaschine/registermaschine.component';
import { EditorComponent } from './editor/editor.component';
import { ControlsComponent } from './controls/controls.component';
import { RegistermaschineProviderService } from './registermaschine-provider.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { ProgramError } from './models/program';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'rma-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
  imports: [
    RegistermaschineComponent,
    EditorComponent,
    ControlsComponent,
    MatButtonModule,
    MatIcon,
    MatDialogModule,
  ],

  providers: [RegistermaschineProviderService],
})
export class ProgramComponent {
  readonly #rm = inject(RegistermaschineProviderService).registermaschine;
  readonly code = signal<string>('');
  readonly rmRunning = signal<boolean>(false);

  #dialog = inject(MatDialog);
  readonly errors = signal<ProgramError[] | undefined>(undefined);

  constructor(title: Title) {
    title.setTitle('Registermaschine');
  }

  async showSettings() {
    const newSettings = await firstValueFrom(this.#dialog.open(SettingsDialogComponent, {
      data: {
        programMemorySize: this.#rm.programMemory.size,
        dataMemorySize: this.#rm.dataMemory.size,
        clockFrequency: this.#rm.clockFrequency,
      }
    }
    ).afterClosed());

    if (newSettings) {
      this.#rm.programMemory.size = newSettings.programMemorySize;
      this.#rm.dataMemory.size = newSettings.dataMemorySize;
      this.#rm.clockFrequency = newSettings.clockFrequency;
    }
  }

  showHelp() {
    this.#dialog.open(HelpDialogComponent);
  }
}
