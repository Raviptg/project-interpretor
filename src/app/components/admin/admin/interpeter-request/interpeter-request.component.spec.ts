import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpeterRequestComponent } from './interpeter-request.component';

describe('InterpeterRequestComponent', () => {
  let component: InterpeterRequestComponent;
  let fixture: ComponentFixture<InterpeterRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterpeterRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterpeterRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
