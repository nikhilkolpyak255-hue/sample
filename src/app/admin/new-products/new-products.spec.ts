import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProducts } from './new-products';

describe('NewProducts', () => {
  let component: NewProducts;
  let fixture: ComponentFixture<NewProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewProducts],
    }).compileComponents();

    fixture = TestBed.createComponent(NewProducts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
