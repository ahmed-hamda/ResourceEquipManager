import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Competence } from 'src/app/Models/Competence/Competence';
import { Equipement } from 'src/app/Models/Equipement/Equipement';

@Component({
  selector: 'app-add-equipement-dialog',
  templateUrl: './add-equipement-dialog.component.html',
  styleUrls: ['./add-equipement-dialog.component.scss']
})
export class AddEquipementDialogComponent implements OnInit {

  @Input() equipementDialogAdd: boolean = false;
  @Input() etatsOptions :any;
  employe: Equipement={
    nom:'',
    type:'',
    dateAchat: new Date() ,
    etat:'',
    competence : {
      nom : '',
      type : '',
      certifications:[]
    },
  };
  @Input() competences: Competence[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  equipementForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.equipementForm = this.fb.group({
       nom: ['', Validators.required],
       type: ['', Validators.required],
       dateAchat: ['', Validators.required],
       etat : ['',Validators.required],
       competence : [null],
    });
  }

  
  ngOnInit(): void {
    
  }

  addEquipement() {
    this.submitted = true;
    if (this.equipementForm.invalid) {
      console.log('Le formulaire est invalide.');
      console.log(this.equipementForm);
      
      return;
  }
    const equipementData = this.equipementForm.value;
    equipementData.competence = {
      id: equipementData.competence
    };
      
    const date = new Date(equipementData.dateAchat);
    date.setDate(date.getDate() + 1); // Ajouter 1 jour
    equipementData.dateAchat = date;  
    this.save.emit(equipementData);
    this.submitted = false;
    this.equipementForm.reset()
  }
  
  hideDialog() {
    this.close.emit();
    this.submitted = false; 
    this.equipementForm.reset();

  }
}


