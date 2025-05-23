import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAffectationDialogComponent } from './edit-affectation-dialog.component';

describe('EditAffectationDialogComponent', () => {
  let component: EditAffectationDialogComponent;
  let fixture: ComponentFixture<EditAffectationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAffectationDialogComponent]
    });
    fixture = TestBed.createComponent(EditAffectationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
