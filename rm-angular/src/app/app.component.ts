import { Component, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RegistermaschineComponent } from './registermaschine/registermaschine.component';
import { EditorComponent } from "./editor/editor.component";
import { ControlsComponent } from "./controls/controls.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RegistermaschineComponent, EditorComponent, ControlsComponent],
})
export class AppComponent {
  constructor(title: Title) {
    title.setTitle('Registermaschine');
  }

  code = signal<string>('');
}
