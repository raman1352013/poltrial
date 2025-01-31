import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverPassComponent } from './driver-pass.component';

describe('DriverPassComponent', () => {
  let component: DriverPassComponent;
  let fixture: ComponentFixture<DriverPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
