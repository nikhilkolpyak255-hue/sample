import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeeds } from './add-seeds';

describe('AddSeeds', () => {
  let component: AddSeeds;
  let fixture: ComponentFixture<AddSeeds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSeeds],
    }).compileComponents();

    fixture = TestBed.createComponent(AddSeeds);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
