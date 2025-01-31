import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedAfterRegistrationComponent } from './rejected-after-registration.component';

describe('RejectedAfterRegistrationComponent', () => {
  let component: RejectedAfterRegistrationComponent;
  let fixture: ComponentFixture<RejectedAfterRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedAfterRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedAfterRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
