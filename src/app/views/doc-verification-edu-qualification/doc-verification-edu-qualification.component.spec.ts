import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocVerificationEduQualificationComponent } from './doc-verification-edu-qualification.component';

describe('DocVerificationEduQualificationComponent', () => {
  let component: DocVerificationEduQualificationComponent;
  let fixture: ComponentFixture<DocVerificationEduQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocVerificationEduQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocVerificationEduQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
