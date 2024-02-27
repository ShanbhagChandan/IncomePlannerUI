import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensedialogComponent } from './expensedialog.component';

describe('ExpensedialogComponent', () => {
  let component: ExpensedialogComponent;
  let fixture: ComponentFixture<ExpensedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensedialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
