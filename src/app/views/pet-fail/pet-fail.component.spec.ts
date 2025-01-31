import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetFailComponent } from './pet-fail.component';

describe('PetFailComponent', () => {
  let component: PetFailComponent;
  let fixture: ComponentFixture<PetFailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetFailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
