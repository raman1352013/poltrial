import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitCardScrutinyComponent } from './admit-card-scrutiny.component';

describe('AdmitCardScrutinyComponent', () => {
  let component: AdmitCardScrutinyComponent;
  let fixture: ComponentFixture<AdmitCardScrutinyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmitCardScrutinyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmitCardScrutinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
