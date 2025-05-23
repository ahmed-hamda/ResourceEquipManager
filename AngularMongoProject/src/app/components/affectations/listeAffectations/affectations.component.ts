import { Component, OnInit } from '@angular/core';
import { Affectation } from '../../../Models/Affectation/Affectation';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AffectationService } from '../../../service/affectationService/affectaion.service';
import { Employe } from 'src/app/Models/Employe/Employe';
import { EmployeService } from 'src/app/service/employesService/employe.service';
import { Equipement } from 'src/app/Models/Equipement/Equipement';
import { EquipementService } from 'src/app/service/equipementService/equipement.service';
import { TacheService } from 'src/app/service/tacheService/tache.service';
import { Tache } from 'src/app/Models/Tache/Tache';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authService/auth.service';


@Component({
  selector: 'app-affectations',
  templateUrl: './affectations.component.html',
  styleUrls: ['./affectations.component.scss']
})
export class AffectationsComponent implements OnInit {

  affectationDialogAdd: boolean = false;

  showTable: boolean = false;

  submitted: boolean = false;

  affectationDialogEdit: boolean = false;

  deleteAffectationDialog: boolean = false;

  affectation: Affectation = {
    dateDebut:new Date(),
    dateFin: new Date(),
    dateFinReel: new Date(),
      statut : '',
    employe:{
      id: 0,
      nom: '',
      prenom: '',
      cin: 0,
      email: '',
      password:'',
      role:'',
      competences: []
    },
    equipement:{
      nom:'',
      type:'',
      dateAchat: new Date() ,
      etat:'',
      competence : {
        nom : '',
        type : '',
        certifications:[]
      },
    },
    tache :{
      nom:'',
      description:'',
      statut:'',
    }
    
  };

  affectations: Affectation[] = [];

  employes: Employe[] = [];

  equipements: Equipement[] = [];

  taches: Tache[]= [];
  
  selectedAffectation:any;

  constructor(private affectationService:AffectationService,private messageService: MessageService, private employeService : EmployeService,
              private equipementService:EquipementService, private tacheService:TacheService,
            private router : Router,private authService : AuthService) {

  }

  ngOnInit(): void {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
    
    this.affectationService.getAffectations().subscribe((data: any) => {
      this.affectations = data;
    },
    (error:any)=>{
      if(error.status===403){
        this.router.navigate(['/unAuthorized']);
      }
    });
  }
  }

  openNew() {
    this.affectationDialogAdd= true;
    this.tacheService.getTaches().subscribe((data: any) => {
      this.taches = data.filter((tache: any) => 
        tache.statut && tache.statut.toLowerCase() === 'non affectée'
      );
    });

    this.equipementService.getEquipements().subscribe((data: any) => {
      this.equipements = data;
    });

    this.employeService.getEmployes().subscribe((data: any) => {
      this.employes = data;
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  deleteAffectation(affectation: Affectation) {
    this.deleteAffectationDialog = true;
    this.affectation = { ...affectation };
  }

  confirmDelete() {
    this.deleteAffectationDialog = false;
    if (this.affectation && this.affectation.id) {
      this.affectationService.deleteAffectation(this.affectation.id).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Affectation supprimé', life: 3000 });
        this.loadAffectations();
      }, error => {
        console.error('Error deleting Affectation:', error);
      });
    } else {
      console.error('Invalid Affectation ID:', this.affectation);
    }
  }

  onAddAffectation(data : any) {
    this.affectationService.addAffectation(data).subscribe(() => {
      this.loadAffectations();
      this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'affectation créé', life: 3000 });
      this.affectationDialogAdd = false;
    }, (error:any) => {
      console.log(error);
      
    });
  }

  getAffectation(id: any) {
    this.affectationDialogEdit= true;

    this.affectationService.getAffectationById(id).subscribe(
      (data: any) => {
        console.log('Affectation récupéré:', data);        
        this.selectedAffectation=data;
        this.tacheService.getTaches().subscribe((data: any) => {
          this.taches = data;
        });
        this.equipementService.getEquipements().subscribe((data: any) => {
          this.equipements = data;
        }); 
        
        this.employeService.getEmployes().subscribe((data: any) => {
          this.employes = data;
        }); 
        
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du Affectation !', error);
      }
    );
  }

  onUpdateAffectation(updatedData: any) {
    this.affectationService.updateAffectation(updatedData.id, updatedData).subscribe(() => {
      this.loadAffectations();
      this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Affectation actualisé', life: 3000 });
      this.affectationDialogEdit = false;
    },
    error => {
        console.error(error);
    })
      
    };

  loadAffectations() {
    this.affectationService.getAffectations().subscribe((data: any) => {
      this.affectations = data;
    });
  }


}
