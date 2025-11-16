import { inject, Injectable, InjectionToken } from '@angular/core';
import {
  Registermaschine,
  RegistermaschineConfig,
} from './models/registermaschine';

export const REGISTERMASCHINE_SETTINGS =
  new InjectionToken<RegistermaschineConfig>('REGISTERMASCHINE_SETTINGS');

@Injectable({
  providedIn: 'root',
})
export class RegistermaschineProviderService {

  constructor() {
    
  }
  readonly #registermaschine = new Registermaschine(inject(REGISTERMASCHINE_SETTINGS, {
    optional: true,
  }) ?? undefined);

  get registermaschine(): Registermaschine {
    return this.#registermaschine;
  }
}
