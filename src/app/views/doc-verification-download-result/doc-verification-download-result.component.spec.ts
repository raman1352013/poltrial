import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocVerificationDownloadResultComponent } from './doc-verification-download-result.component';

describe('DocVerificationDownloadResultComponent', () => {
  let component: DocVerificationDownloadResultComponent;
  let fixture: ComponentFixture<DocVerificationDownloadResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocVerificationDownloadResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocVerificationDownloadResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
