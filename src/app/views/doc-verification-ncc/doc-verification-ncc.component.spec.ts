import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocVerificationNccComponent } from './doc-verification-ncc.component';

describe('DocVerificationNccComponent', () => {
  let component: DocVerificationNccComponent;
  let fixture: ComponentFixture<DocVerificationNccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocVerificationNccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocVerificationNccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
