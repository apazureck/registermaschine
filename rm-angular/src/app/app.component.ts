import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RegistermaschineComponent } from './registermaschine/registermaschine.component';
import { EditorComponent } from "./editor/editor.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RegistermaschineComponent, EditorComponent],
})
export class AppComponent {
  constructor(title: Title) {
    title.setTitle('Registermaschine');
  }
}
