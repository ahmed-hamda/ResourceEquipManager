import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Competence } from 'src/app/Models/Competence/Competence';
import { Employe } from 'src/app/Models/Employe/Employe';

@Component({
  selector: 'app-edit-employe-dialog',
  templateUrl: './edit-employe-dialog.component.html',
  styleUrls: ['./edit-employe-dialog.component.scss']
})
export class EditEmployeDialogComponent implements OnInit {

  @Input() employeDialogEdit: boolean = false;
  @Input() employe: Employe={
    nom: '',
    prenom: '',
    cin: 0,
    email: '',
    competences: [],
    password: '',
    role: ''
  };
  @Input() competences: Competence[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  employeFormEdit!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.employeFormEdit = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      competences: [[]]
    });
  }

  
  ngOnInit(): void {
    
  }

  ngOnChanges() {
    if (this.employeFormEdit && this.employe) {
      this.employeFormEdit.patchValue({
        id: this.employe.id,
        nom: this.employe.nom,
        prenom: this.employe.prenom,
        email: this.employe.email,
        cin: this.employe.cin,
        competences: this.employe.competences
      });
    }
  }

  updateEmploye() {
    this.submitted = true;
    if (this.employeFormEdit.invalid) {
      console.log('Le formulaire est invalide.');
      console.log(this.employeFormEdit);
      
      return;
  }
    const employeData = this.employeFormEdit.value;

    const employeId = employeData.id;
    console.log(employeId);
    if (!employeId) {
        console.error('Identifiant de l\'utilisateur non défini.');
        return;
    }
    employeData.competences = employeData.competences.map((id: string) => ({ id }));
    this.save.emit(employeData);
    this.submitted = false;
  }
  
  hideDialog() {
    this.close.emit();
  }
}
