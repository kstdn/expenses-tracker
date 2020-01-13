import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyMovementRowComponent } from './money-movement-row.component';

describe('MoneyMovementRowComponent', () => {
  let component: MoneyMovementRowComponent;
  let fixture: ComponentFixture<MoneyMovementRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyMovementRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyMovementRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
