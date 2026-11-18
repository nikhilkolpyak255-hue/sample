import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFertilizers } from './add-fertilizers';

describe('AddFertilizers', () => {
  let component: AddFertilizers;
  let fixture: ComponentFixture<AddFertilizers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFertilizers],
    }).compileComponents();

    fixture = TestBed.createComponent(AddFertilizers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
