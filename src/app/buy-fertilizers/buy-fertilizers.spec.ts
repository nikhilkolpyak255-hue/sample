import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyFertilizers } from './buy-fertilizers';

describe('BuyFertilizers', () => {
  let component: BuyFertilizers;
  let fixture: ComponentFixture<BuyFertilizers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyFertilizers],
    }).compileComponents();

    fixture = TestBed.createComponent(BuyFertilizers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
