import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighJumpComponent } from './high-jump.component';

describe('HighJumpComponent', () => {
  let component: HighJumpComponent;
  let fixture: ComponentFixture<HighJumpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighJumpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighJumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
