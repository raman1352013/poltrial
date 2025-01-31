import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocVerificationRegComponent } from './doc-verification-reg.component';

describe('DocVerificationRegComponent', () => {
  let component: DocVerificationRegComponent;
  let fixture: ComponentFixture<DocVerificationRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocVerificationRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocVerificationRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
