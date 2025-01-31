import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadJumpComponent } from './broad-jump.component';

describe('BroadJumpComponent', () => {
  let component: BroadJumpComponent;
  let fixture: ComponentFixture<BroadJumpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BroadJumpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadJumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
