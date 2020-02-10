import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyMovementComponent } from './money-movement.component';

describe('MoneyMovementComponent', () => {
  let component: MoneyMovementComponent;
  let fixture: ComponentFixture<MoneyMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
