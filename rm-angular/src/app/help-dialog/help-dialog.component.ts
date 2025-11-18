import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HelpTextComponent } from '../help-text/help-text.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'rma-help-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    HelpTextComponent,
    RouterModule,
  ],
  templateUrl: './help-dialog.component.html',
  styleUrl: './help-dialog.component.scss',
})
export class HelpDialogComponent {
  #router = inject(Router);
  openHelpRouteInNewTab() {
    const url = this.#router.serializeUrl(
      this.#router.createUrlTree([`/help`])
    );

    window.open(url, '_blank');
  }
}
