import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployesComponent } from './employes.component';

describe('employeComponent', () => {
  let component: EmployesComponent;
  let fixture: ComponentFixture<EmployesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployesComponent]
    });
    fixture = TestBed.createComponent(EmployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
