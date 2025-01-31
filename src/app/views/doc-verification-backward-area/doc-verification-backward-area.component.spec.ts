import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocVerificationBackwardAreaComponent } from './doc-verification-backward-area.component';

describe('DocVerificationBackwardAreaComponent', () => {
  let component: DocVerificationBackwardAreaComponent;
  let fixture: ComponentFixture<DocVerificationBackwardAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocVerificationBackwardAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocVerificationBackwardAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
