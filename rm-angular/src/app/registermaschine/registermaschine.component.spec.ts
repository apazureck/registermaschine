import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistermaschineComponent } from './registermaschine.component';

describe('RegistermaschineComponent', () => {
  let component: RegistermaschineComponent;
  let fixture: ComponentFixture<RegistermaschineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistermaschineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistermaschineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
