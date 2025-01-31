import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySummaryScrutinyNssComponent } from './daily-summary-scrutiny-nss.component';

describe('DailySummaryScrutinyNssComponent', () => {
  let component: DailySummaryScrutinyNssComponent;
  let fixture: ComponentFixture<DailySummaryScrutinyNssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailySummaryScrutinyNssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySummaryScrutinyNssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
