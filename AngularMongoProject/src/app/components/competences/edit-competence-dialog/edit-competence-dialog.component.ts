import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Certification } from 'src/app/Models/Certification/Certification';
import { Competence } from 'src/app/Models/Competence/Competence';

@Component({
  selector: 'app-edit-competence-dialog',
  templateUrl: './edit-competence-dialog.component.html',
  styleUrls: ['./edit-competence-dialog.component.scss']
})
export class EditCompetenceDialogComponent  implements OnInit {

  @Input() competenceDialogEdit: boolean = false;
  @Input() competence: Competence={
    nom : '',
    type : '',
    certifications:[]
  };
  @Input() certifications: Certification[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  competenceFormEdit!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.competenceFormEdit = this.fb.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      type: ['', Validators.required],
      certifications: [[]],
    });
    };

  
  ngOnInit(): void {
    
  }

  ngOnChanges() {
    if (this.competenceFormEdit && this.competence) {
      this.competenceFormEdit.patchValue({
        id: this.competence.id,
        nom :this.competence.nom,
        type :this.competence.type,
        certifications : this.competence.certifications || [],
      });
    }
  }

  updateCompetence() {
    this.submitted = true;
    if (this.competenceFormEdit.invalid) {
      console.log('Le formulaire est invalide.');
      console.log(this.competenceFormEdit);
      
      return;
  }
    const competenceData = this.competenceFormEdit.value;

    competenceData.certifications = competenceData.certifications.map((id: string) => ({ id }));
    this.save.emit(competenceData);
    this.submitted = false;
  }
  
  hideDialog() {
    this.close.emit();
  }
}

