import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocVerificationDownloadRowDataComponent } from './doc-verification-download-row-data.component';

describe('DocVerificationDownloadRowDataComponent', () => {
  let component: DocVerificationDownloadRowDataComponent;
  let fixture: ComponentFixture<DocVerificationDownloadRowDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocVerificationDownloadRowDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocVerificationDownloadRowDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
