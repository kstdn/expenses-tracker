import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyBudgetTileComponent } from './daily-budget-tile.component';

describe('DailyBudgetTileComponent', () => {
  let component: DailyBudgetTileComponent;
  let fixture: ComponentFixture<DailyBudgetTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyBudgetTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyBudgetTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
