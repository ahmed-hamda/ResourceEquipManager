import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Affectation } from 'src/app/Models/Affectation/Affectation';
import { Employe } from 'src/app/Models/Employe/Employe';
import { Equipement } from 'src/app/Models/Equipement/Equipement';
import { Tache } from 'src/app/Models/Tache/Tache';
import { AffectationService } from 'src/app/service/affectationService/affectaion.service';

@Component({
  selector: 'app-edit-affectation-dialog',
  templateUrl: './edit-affectation-dialog.component.html',
  styleUrls: ['./edit-affectation-dialog.component.scss']
})
export class EditAffectationDialogComponent implements OnInit {

    @Input() affectationDialogEdit: boolean = false;
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
    @Input() taches: Tache[] = [];
    @Input() employes: Employe[] = [];
    @Output() close = new EventEmitter<void>();
    @Output() save = new EventEmitter<any>();

    affectationFormEdit!: FormGroup;
    submitted = false;

    constructor(private fb: FormBuilder, private affectationService: AffectationService) {
        this.affectationFormEdit = this.fb.group({
          id: ['', Validators.required],
          dateDebut: [new Date(),Validators.required],
          dateFin: [new Date(),Validators.required],
          employe: [{}, Validators.required],
          equipement : [{},Validators.required],
          tache:  [{},Validators.required]
        });
      }

      ngOnInit(): void {
        
      }
      ngOnChanges() {
        
        if (this.affectationFormEdit && this.affectation) {
          
          const dateD = new Date(this.affectation.dateDebut);
          dateD.setDate(dateD.getDate()); // Ajouter 1 jour
          this.affectation.dateDebut = dateD;
          
          const dateF = new Date(this.affectation.dateFin);
          dateF.setDate(dateF.getDate()); // Ajouter 1 jour
          this.affectation.dateFin = dateF;
          
          this.affectationFormEdit.patchValue({
            id: this.affectation.id,
            dateDebut: this.affectation.dateDebut ,
            dateFin: this.affectation.dateFin ,
            dateFinReel : this.affectation.dateFinReel,
            employe : this.affectation.employe,
            equipement : this.affectation.equipement,
            tache : this.affectation.tache,
            statut : this.affectation.statut
          });
        }
      }

      updateAffectation() {
        this.submitted = true;
        if (this.affectationFormEdit.invalid) {
          console.log('Le formulaire est invalide.');
          console.log(this.affectationFormEdit);
          
          return;
      }
        const affectationData = this.affectationFormEdit.value;
       

        console.log(affectationData);
        
        const affectationId = affectationData.id;
        console.log(affectationId);
        if (!affectationId) {
            console.error('Identifiant de l\'utilisateur non défini.');
            return;
        }

        
        affectationData.equipement = {
          id: affectationData.equipement.id
        }; 

        console.log(affectationData.value);
        
        affectationData.employe = {
          id: affectationData.employe.id || affectationData.employe
        };  
        
        affectationData.tache = {
          id: affectationData.tache.id
        };  
        
        const affecationEnvoye={
          ... this.affectation,
          affectationData,
        }
        
        this.save.emit(affecationEnvoye);
        this.submitted = false;
      }
      
      getEmployesByEquipement(data: any) {
        
        this.affectationService.getEmployesCompatibles(data.id).subscribe((data: any) => {
          this.employes = data;
        });
      }

      getEquipementsByEmploye(employe: any) {
        this.affectationService.getEquipementsCompatibles(employe.id).subscribe((data: any) => {
          this.equipements= data;
        });
      }
      hideDialog() {
        this.close.emit();

      }
}
