import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PstPendingComponent } from './pst-pending.component';

describe('PstPendingComponent', () => {
  let component: PstPendingComponent;
  let fixture: ComponentFixture<PstPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PstPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PstPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
