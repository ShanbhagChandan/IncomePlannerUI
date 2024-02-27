import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensetablesComponent } from './expensetables.component';

describe('ExpensetablesComponent', () => {
  let component: ExpensetablesComponent;
  let fixture: ComponentFixture<ExpensetablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensetablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensetablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
