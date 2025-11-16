import { TestBed } from '@angular/core/testing';

import { RegistermaschineProviderService } from './registermaschine-provider.service';

describe('RegistermaschineProviderService', () => {
  let service: RegistermaschineProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistermaschineProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
