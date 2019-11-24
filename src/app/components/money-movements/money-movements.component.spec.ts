import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyMovementsComponent } from './money-movements.component';

describe('MoneyMovementsComponent', () => {
  let component: MoneyMovementsComponent;
  let fixture: ComponentFixture<MoneyMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
