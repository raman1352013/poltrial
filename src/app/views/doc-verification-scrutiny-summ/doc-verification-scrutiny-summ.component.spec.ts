import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocVerificationScrutinySummComponent } from './doc-verification-scrutiny-summ.component';

describe('DocVerificationScrutinySummComponent', () => {
  let component: DocVerificationScrutinySummComponent;
  let fixture: ComponentFixture<DocVerificationScrutinySummComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocVerificationScrutinySummComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocVerificationScrutinySummComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
