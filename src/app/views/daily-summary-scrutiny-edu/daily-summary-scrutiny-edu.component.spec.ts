import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySummaryScrutinyEduComponent } from './daily-summary-scrutiny-edu.component';

describe('DailySummaryScrutinyEduComponent', () => {
  let component: DailySummaryScrutinyEduComponent;
  let fixture: ComponentFixture<DailySummaryScrutinyEduComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailySummaryScrutinyEduComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySummaryScrutinyEduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
