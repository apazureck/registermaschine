import { HttpClient } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatExpansionModule } from '@angular/material/expansion';

const licenseRegex =
  /Package: (\S+)\s+License: "(\S+)"\n\n([\S\s]*?)\n--------------------------------------------------------------------------------/gm;

@Component({
  selector: 'rma-third-party-licenses',
  imports: [MatExpansionModule],
  templateUrl: './third-party-licenses.component.html',
  styleUrl: './third-party-licenses.component.scss',
})
export class ThirdPartyLicensesComponent {
  #httpClient = inject(HttpClient);
  #licenseText = toSignal(
    this.#httpClient.get('assets/thirdpartylicenses.txt', {
      responseType: 'text',
    })
  );
  licenses = computed(() => {
    const text = this.#licenseText();

    return this.#parseLicenseText(text || '');
  });

  #parseLicenseText(
    arg0: string
  ): { packageName: string; licenseType: string; licenseText: string }[] {
    const matches = arg0.matchAll(licenseRegex);
    const result = [];
    for (const match of matches) {
      result.push({
        packageName: match[1],
        licenseType: match[2],
        licenseText: match[3],
      });
    }
    return result;
  }
}
