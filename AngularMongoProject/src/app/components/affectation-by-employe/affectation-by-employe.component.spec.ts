import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationByEmployeComponent } from './affectation-by-employe.component';

describe('AffectationByEmployeComponent', () => {
  let component: AffectationByEmployeComponent;
  let fixture: ComponentFixture<AffectationByEmployeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffectationByEmployeComponent]
    });
    fixture = TestBed.createComponent(AffectationByEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
