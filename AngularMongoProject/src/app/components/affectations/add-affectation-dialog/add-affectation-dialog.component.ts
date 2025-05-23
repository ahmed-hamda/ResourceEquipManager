import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Affectation } from 'src/app/Models/Affectation/Affectation';
import { Employe } from 'src/app/Models/Employe/Employe';
import { Equipement } from 'src/app/Models/Equipement/Equipement';
import { Tache } from 'src/app/Models/Tache/Tache';
import { AffectationService } from 'src/app/service/affectationService/affectaion.service';

@Component({
  selector: 'app-add-affectation-dialog',
  templateUrl: './add-affectation-dialog.component.html',
  styleUrls: ['./add-affectation-dialog.component.scss']
})
export class AddAffectationDialogComponent implements OnInit {

  @Input() affectationDialogAdd: boolean = false;
  @Input() affectation: Affectation = {
    dateDebut: new Date(),
    dateFin: new Date(),
    dateFinReel: new Date(),
    statut : '',
    employe: {
      id: 0,
      nom: '',
      prenom: '',
      cin: 0,
      email: '',
      competences: [],
      password: '',
      role: ''
    },
    equipement: {
      nom: '',
      type: '',
      dateAchat: new Date(),
      etat: '',
      competence: {
        nom : '',
        type : '',
        certifications:[]
      },
    },
    tache: {
      nom: '',
      description: '',
      statut: '',
    }
  };
  @Input() equipements: Equipement[] = [];
  @Input() employes: Employe[] = [];
  @Input() taches: Tache[] = [];
  employesCompatibles: Employe[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  affectationForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private messageService: MessageService, private affectationService: AffectationService) {
    this.affectationForm = this.fb.group({
      dateDebut: ['', Validators.required,],
      dateFin: ['', Validators.required],
      employe: [null, Validators.required],
      equipement: [null, Validators.required],
      tache: [null, Validators.required]
    });
  }


  ngOnInit(): void {

  }

  addAffectation() {
    this.submitted = true;
    if (this.affectationForm.invalid) {
      console.log('Le formulaire est invalide.');
      console.log(this.affectationForm);
      return;
    }

    const affectationForm = this.affectationForm.value;

    affectationForm.statut = "en cours";
    affectationForm.dateFinReel = affectationForm.dateFin;
    
    console.log(this.affectationForm.value);
    affectationForm.employe = {
      id: affectationForm.employe.id
    };
    affectationForm.equipement = {
      id: affectationForm.equipement
    };
    affectationForm.tache = {
      id: affectationForm.tache.id
    };

    const dateD = new Date(affectationForm.dateDebut);
    dateD.setDate(dateD.getDate() + 1); 
    affectationForm.dateDebut = dateD; 

    const dateF = new Date(affectationForm.dateFin);
    dateF.setDate(dateF.getDate() + 1); 
    affectationForm.dateFin = dateF; 

    this.save.emit(affectationForm);
    this.submitted = false;
    this.affectationForm.reset();
    this.employesCompatibles = [];

  }
  getEmployesByEquipement(id: any) {
    this.affectationService.getEmployesCompatibles(id).subscribe((data: any) => {
      this.employes= data;
    });
  }

  getEquipementsByEmploye(employe: any) {
    this.affectationService.getEquipementsCompatibles(employe.id).subscribe((data: any) => {
      this.equipements= data;
    });
  }
  hideDialog() {
    this.close.emit();
    this.submitted = false;
    this.affectationForm.reset();
    this.employesCompatibles = [];


  }
}
