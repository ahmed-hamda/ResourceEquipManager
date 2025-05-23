import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Certification } from 'src/app/Models/Certification/Certification';
import { Competence } from 'src/app/Models/Competence/Competence';

@Component({
  selector: 'app-add-competence-dialog',
  templateUrl: './add-competence-dialog.component.html',
  styleUrls: ['./add-competence-dialog.component.scss']
})
export class AddCompetenceDialogComponent implements OnInit {

  @Input()competenceDialogAdd: boolean = false;
  competence: Competence={  
    nom : '',
    type : '',
    certifications:[]
  };
  @Input() certifications: Certification[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  competenceForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
     this.competenceForm = this.fb.group({
          nom: ['', Validators.required],
          type: ['', Validators.required],
          certifications: [[]],
        });
  }

  
  ngOnInit(): void {
    
  }

  addCompetence() {
    this.submitted = true;
    if (this.competenceForm.invalid) {
      console.log('Le formulaire est invalide.');
      console.log(this.competenceForm);
      return;
  }
    const competenceData = this.competenceForm.value;
    if (!this.competenceForm.value.certifications) {
      competenceData.certifications=[];
    }
    else {
      competenceData.certifications = competenceData.certifications.map((id: string) => ({
        id: id
      }));
    }
    this.save.emit(competenceData);
    this.submitted = false;
    this.competenceForm.reset()
  }
  
  hideDialog() {
    this.close.emit();
    this.submitted = false; 
    this.competenceForm.reset();

  }
}
