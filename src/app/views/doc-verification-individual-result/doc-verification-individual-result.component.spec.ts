import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocVerificationIndividualResultComponent } from './doc-verification-individual-result.component';

describe('DocVerificationIndividualResultComponent', () => {
  let component: DocVerificationIndividualResultComponent;
  let fixture: ComponentFixture<DocVerificationIndividualResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocVerificationIndividualResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocVerificationIndividualResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
