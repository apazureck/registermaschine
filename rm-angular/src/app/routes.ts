import { Routes } from '@angular/router';
import { ProgramComponent } from './program.component';
import { HelpTextComponent } from './help-text/help-text.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Registermaschine',
    component: ProgramComponent,
  },
  {
    path: 'help',
    title: 'Hilfe - Registermaschine',
    component: HelpTextComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];
