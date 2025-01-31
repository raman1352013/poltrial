import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualProfileUpdateComponent } from './individual-profile-update.component';

describe('IndividualProfileUpdateComponent', () => {
  let component: IndividualProfileUpdateComponent;
  let fixture: ComponentFixture<IndividualProfileUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualProfileUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
