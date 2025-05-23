import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTacheDialogComponent } from './edit-tache-dialog.component';

describe('EditTacheDialogComponent', () => {
  let component: EditTacheDialogComponent;
  let fixture: ComponentFixture<EditTacheDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTacheDialogComponent]
    });
    fixture = TestBed.createComponent(EditTacheDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
