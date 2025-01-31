import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowProvisionedComponent } from './allow-provisioned.component';

describe('AllowProvisionedComponent', () => {
  let component: AllowProvisionedComponent;
  let fixture: ComponentFixture<AllowProvisionedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllowProvisionedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowProvisionedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
