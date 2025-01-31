import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PstPassComponent } from './pst-pass.component';

describe('PstPassComponent', () => {
  let component: PstPassComponent;
  let fixture: ComponentFixture<PstPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PstPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PstPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
