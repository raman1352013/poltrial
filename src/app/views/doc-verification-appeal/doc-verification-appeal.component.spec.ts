import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocVerificationAppealComponent } from './doc-verification-appeal.component';

describe('DocVerificationAppealComponent', () => {
  let component: DocVerificationAppealComponent;
  let fixture: ComponentFixture<DocVerificationAppealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocVerificationAppealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocVerificationAppealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
