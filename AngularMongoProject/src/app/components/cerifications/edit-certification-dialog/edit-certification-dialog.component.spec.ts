import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCertificationDialogComponent } from './edit-certification-dialog.component';

describe('EditCertificationDialogComponent', () => {
  let component: EditCertificationDialogComponent;
  let fixture: ComponentFixture<EditCertificationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCertificationDialogComponent]
    });
    fixture = TestBed.createComponent(EditCertificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
