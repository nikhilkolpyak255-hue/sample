import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildCardPage } from './wild-card-page';

describe('WildCardPage', () => {
  let component: WildCardPage;
  let fixture: ComponentFixture<WildCardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WildCardPage],
    }).compileComponents();

    fixture = TestBed.createComponent(WildCardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
