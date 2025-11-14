import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramRegisterComponent } from './program-register.component';

describe('ProgramRegisterComponent', () => {
  let component: ProgramRegisterComponent;
  let fixture: ComponentFixture<ProgramRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
