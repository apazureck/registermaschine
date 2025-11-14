import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMemoryComponent } from './data-memory.component';

describe('DataMemoryComponent', () => {
  let component: DataMemoryComponent;
  let fixture: ComponentFixture<DataMemoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataMemoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
