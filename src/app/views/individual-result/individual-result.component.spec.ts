import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualResultComponent } from './individual-result.component';

describe('IndividualResultComponent', () => {
  let component: IndividualResultComponent;
  let fixture: ComponentFixture<IndividualResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
