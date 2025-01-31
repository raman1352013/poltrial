import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverFailComponent } from './driver-fail.component';

describe('DriverFailComponent', () => {
  let component: DriverFailComponent;
  let fixture: ComponentFixture<DriverFailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverFailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
