import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySummaryScrutinyNccComponent } from './daily-summary-scrutiny-ncc.component';

describe('DailySummaryScrutinyNccComponent', () => {
  let component: DailySummaryScrutinyNccComponent;
  let fixture: ComponentFixture<DailySummaryScrutinyNccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailySummaryScrutinyNccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySummaryScrutinyNccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
