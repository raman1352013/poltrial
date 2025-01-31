import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySummaryScrutinyLmvComponent } from './daily-summary-scrutiny-lmv.component';

describe('DailySummaryScrutinyLmvComponent', () => {
  let component: DailySummaryScrutinyLmvComponent;
  let fixture: ComponentFixture<DailySummaryScrutinyLmvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailySummaryScrutinyLmvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySummaryScrutinyLmvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
