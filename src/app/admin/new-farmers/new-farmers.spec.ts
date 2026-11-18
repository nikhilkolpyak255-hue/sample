import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFarmers } from './new-farmers';

describe('NewFarmers', () => {
  let component: NewFarmers;
  let fixture: ComponentFixture<NewFarmers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewFarmers],
    }).compileComponents();

    fixture = TestBed.createComponent(NewFarmers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
