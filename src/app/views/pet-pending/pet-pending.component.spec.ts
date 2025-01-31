import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetPendingComponent } from './pet-pending.component';

describe('PetPendingComponent', () => {
  let component: PetPendingComponent;
  let fixture: ComponentFixture<PetPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
