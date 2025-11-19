import { Routes } from '@angular/router';
import { ProgramComponent } from './program.component';
import { HelpTextComponent } from './help-text/help-text.component';
import { ThirdPartyLicensesComponent } from './third-party-licenses/third-party-licenses.component';

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
    path: 'licenses',
    title: 'Third Party Lizenzen - Registermaschine',
    component: ThirdPartyLicensesComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];
