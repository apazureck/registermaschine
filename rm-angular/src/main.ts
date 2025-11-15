import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
