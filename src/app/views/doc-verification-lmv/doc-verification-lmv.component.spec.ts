import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocVerificationLmvComponent } from './doc-verification-lmv.component';

describe('DocVerificationLmvComponent', () => {
  let component: DocVerificationLmvComponent;
  let fixture: ComponentFixture<DocVerificationLmvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocVerificationLmvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocVerificationLmvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
