import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyMovementCrudComponent } from './money-movement-crud.component';

describe('MoneyMovementCrudComponent', () => {
  let component: MoneyMovementCrudComponent;
  let fixture: ComponentFixture<MoneyMovementCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyMovementCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyMovementCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
