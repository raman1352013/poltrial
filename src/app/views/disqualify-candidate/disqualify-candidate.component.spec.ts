import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisqualifyCandidateComponent } from './disqualify-candidate.component';

describe('DisqualifyCandidateComponent', () => {
  let component: DisqualifyCandidateComponent;
  let fixture: ComponentFixture<DisqualifyCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisqualifyCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisqualifyCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
