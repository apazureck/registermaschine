import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestInputValueComponent } from './request-input-value.component';

describe('RequestInputValueComponent', () => {
  let component: RequestInputValueComponent;
  let fixture: ComponentFixture<RequestInputValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestInputValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestInputValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
