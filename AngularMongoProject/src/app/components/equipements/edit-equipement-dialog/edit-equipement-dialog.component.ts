import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Competence } from 'src/app/Models/Competence/Competence';
import { Equipement } from 'src/app/Models/Equipement/Equipement';

@Component({
  selector: 'app-edit-equipement-dialog',
  templateUrl: './edit-equipement-dialog.component.html',
  styleUrls: ['./edit-equipement-dialog.component.scss']
})
export class EditEquipementDialogComponent implements OnInit {

  @Input() equipementDialogEdit: boolean = false;
  @Input() etatsOptions :any;
  @Input() equipement: Equipement={
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

  equipementFormEdit!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.equipementFormEdit = this.fb.group({
       id: ['', Validators.required],
       nom: ['', Validators.required],
       type: ['', Validators.required],
       dateAchat: [new Date(), Validators.required],
       etat : ['',Validators.required],
       competence : [null],
    });
  }

  
  ngOnInit(): void {
    
  }
  ngOnChanges() {
    if (this.equipementFormEdit && this.equipement) {
      this.equipementFormEdit.patchValue({
        id: this.equipement.id,
        nom: this.equipement.nom ,
        type : this.equipement.type,
        etat :this.equipement.etat,
        dateAchat : this.equipement.dateAchat,
        competence : this.equipement.competence?.id,
      });
    }
  }

  updateEquipement() {
    this.submitted = true;
    if (this.equipementFormEdit.invalid) {
      console.log('Le formulaire est invalide.');
      console.log(this.equipementFormEdit);
      
      return;
  }
    const equipementData = this.equipementFormEdit.value;
    const date = new Date(equipementData.dateAchat);
    date.setDate(date.getDate() + 1); // Ajouter 1 jour
    equipementData.dateAchat = date; 
    const equipementId = equipementData.id;
    console.log(equipementId);
    if (!equipementId) {
        console.error('Identifiant de l\'utilisateur non défini.');
        return;
    }
    equipementData.competence = {
      id: equipementData.competence
    };    this.save.emit(equipementData);
    this.submitted = false;
  }
  
  hideDialog() {
    this.close.emit();
    
  }
}

