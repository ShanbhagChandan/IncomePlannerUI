import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensetabledialogComponent } from './expensetabledialog.component';

describe('ExpensetabledialogComponent', () => {
  let component: ExpensetabledialogComponent;
  let fixture: ComponentFixture<ExpensetabledialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensetabledialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensetabledialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
