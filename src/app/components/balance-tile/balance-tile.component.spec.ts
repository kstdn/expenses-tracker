import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceTileComponent } from './balance-tile.component';

describe('BalanceTileComponent', () => {
  let component: BalanceTileComponent;
  let fixture: ComponentFixture<BalanceTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
