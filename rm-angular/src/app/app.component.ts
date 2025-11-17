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
import {
  defaultRegistermaschineConfig,
  RegistermaschineConfig,
} from './models/registermaschine';
import { ProgramError } from './models/program';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
export class AppComponent {
  readonly code = signal<string>('');
  readonly rmRunning = signal<boolean>(false);

  #dialog = inject(MatDialog);
  readonly errors = signal<ProgramError[] | undefined>(undefined);

  constructor(title: Title) {
    title.setTitle('Registermaschine');
  }

  showSettings() {
    this.#dialog.open(SettingsDialogComponent);
  }
}
