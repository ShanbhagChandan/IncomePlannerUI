import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarycalculatorComponent } from './salarycalculator.component';

describe('SalarycalculatorComponent', () => {
  let component: SalarycalculatorComponent;
  let fixture: ComponentFixture<SalarycalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalarycalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalarycalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
