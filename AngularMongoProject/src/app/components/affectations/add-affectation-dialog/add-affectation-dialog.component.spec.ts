import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAffectationDialogComponent } from './add-affectation-dialog.component';

describe('AddAffectationDialogComponent', () => {
  let component: AddAffectationDialogComponent;
  let fixture: ComponentFixture<AddAffectationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAffectationDialogComponent]
    });
    fixture = TestBed.createComponent(AddAffectationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
