import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpTextComponent } from './help-text.component';

describe('HelpTextComponent', () => {
  let component: HelpTextComponent;
  let fixture: ComponentFixture<HelpTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
