import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySummaryScrutinyComponent } from './daily-summary-scrutiny.component';

describe('DailySummaryScrutinyComponent', () => {
  let component: DailySummaryScrutinyComponent;
  let fixture: ComponentFixture<DailySummaryScrutinyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailySummaryScrutinyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySummaryScrutinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
