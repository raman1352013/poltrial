import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrutinyDetailsComponent } from './scrutiny-details.component';

describe('ScrutinyDetailsComponent', () => {
  let component: ScrutinyDetailsComponent;
  let fixture: ComponentFixture<ScrutinyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrutinyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrutinyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
