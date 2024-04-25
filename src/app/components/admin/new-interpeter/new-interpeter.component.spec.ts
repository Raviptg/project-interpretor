import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInterpeterComponent } from './new-interpeter.component';

describe('NewInterpeterComponent', () => {
  let component: NewInterpeterComponent;
  let fixture: ComponentFixture<NewInterpeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewInterpeterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewInterpeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
