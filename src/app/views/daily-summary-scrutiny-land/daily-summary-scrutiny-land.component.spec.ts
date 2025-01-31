import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySummaryScrutinyLandComponent } from './daily-summary-scrutiny-land.component';

describe('DailySummaryScrutinyLandComponent', () => {
  let component: DailySummaryScrutinyLandComponent;
  let fixture: ComponentFixture<DailySummaryScrutinyLandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailySummaryScrutinyLandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySummaryScrutinyLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
