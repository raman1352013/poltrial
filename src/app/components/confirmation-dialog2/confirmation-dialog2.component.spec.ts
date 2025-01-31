import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialog2Component } from './confirmation-dialog2.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialog2Component;
  let fixture: ComponentFixture<ConfirmationDialog2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDialog2Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialog2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
