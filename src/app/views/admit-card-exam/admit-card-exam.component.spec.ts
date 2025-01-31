import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitCardExamComponent } from './admit-card-exam.component';

describe('AdmitCardExamComponent', () => {
  let component: AdmitCardExamComponent;
  let fixture: ComponentFixture<AdmitCardExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmitCardExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmitCardExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
