import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompetenceDialogComponent } from './add-competence-dialog.component';

describe('AddCompetenceDialogComponent', () => {
  let component: AddCompetenceDialogComponent;
  let fixture: ComponentFixture<AddCompetenceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCompetenceDialogComponent]
    });
    fixture = TestBed.createComponent(AddCompetenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
