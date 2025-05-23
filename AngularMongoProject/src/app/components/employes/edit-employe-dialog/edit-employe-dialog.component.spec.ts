import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeDialogComponent } from './edit-employe-dialog.component';

describe('EditEmployeDialogComponent', () => {
  let component: EditEmployeDialogComponent;
  let fixture: ComponentFixture<EditEmployeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEmployeDialogComponent]
    });
    fixture = TestBed.createComponent(EditEmployeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
