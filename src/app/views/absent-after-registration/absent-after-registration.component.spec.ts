import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentAfterRegistrationComponent } from './absent-after-registration.component';

describe('AbsentAfterRegistrationComponent', () => {
  let component: AbsentAfterRegistrationComponent;
  let fixture: ComponentFixture<AbsentAfterRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsentAfterRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsentAfterRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
