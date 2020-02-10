import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyMovementGroupComponent } from './money-movement-group.component';

describe('MoneyMovementGroupComponent', () => {
  let component: MoneyMovementGroupComponent;
  let fixture: ComponentFixture<MoneyMovementGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyMovementGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyMovementGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
