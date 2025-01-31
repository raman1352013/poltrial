import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetPassComponent } from './pet-pass.component';

describe('PetPassComponent', () => {
  let component: PetPassComponent;
  let fixture: ComponentFixture<PetPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
