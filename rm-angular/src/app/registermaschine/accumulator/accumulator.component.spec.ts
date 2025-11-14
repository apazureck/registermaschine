import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccumulatorComponent } from './accumulator.component';

describe('AccumulatorComponent', () => {
  let component: AccumulatorComponent;
  let fixture: ComponentFixture<AccumulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccumulatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccumulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
