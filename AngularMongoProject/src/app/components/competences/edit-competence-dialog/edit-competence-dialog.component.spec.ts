import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompetenceDialogComponent } from './edit-competence-dialog.component';

describe('EditCompetenceDialogComponent', () => {
  let component: EditCompetenceDialogComponent;
  let fixture: ComponentFixture<EditCompetenceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCompetenceDialogComponent]
    });
    fixture = TestBed.createComponent(EditCompetenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
