import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedAtRegistrationComponent } from './rejected-at-registration.component';

describe('RejectedAtRegistrationComponent', () => {
  let component: RejectedAtRegistrationComponent;
  let fixture: ComponentFixture<RejectedAtRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedAtRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedAtRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
