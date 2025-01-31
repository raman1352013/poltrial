import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PstFailComponent } from './pst-fail.component';

describe('PstFailComponent', () => {
  let component: PstFailComponent;
  let fixture: ComponentFixture<PstFailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PstFailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PstFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
