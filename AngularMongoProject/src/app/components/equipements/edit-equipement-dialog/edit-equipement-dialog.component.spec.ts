import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEquipementDialogComponent } from './edit-equipement-dialog.component';

describe('EditEquipementDialogComponent', () => {
  let component: EditEquipementDialogComponent;
  let fixture: ComponentFixture<EditEquipementDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEquipementDialogComponent]
    });
    fixture = TestBed.createComponent(EditEquipementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
