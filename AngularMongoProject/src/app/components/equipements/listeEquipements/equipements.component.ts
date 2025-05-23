import { Component } from '@angular/core';
import { Equipement } from '../../../Models/Equipement/Equipement';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipementService } from 'src/app/service/equipementService/equipement.service'; 
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CompetenceService } from 'src/app/service/competenceService/competence.service';
import { Competence } from 'src/app/Models/Competence/Competence';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/service/authService/auth.service';

@Component({
  selector: 'app-equipements',
  templateUrl: './equipements.component.html',
  styleUrls: ['./equipements.component.scss']
})
export class EquipementsComponent {

  showTable: boolean = false;

  submitted: boolean = false;

  equipementDialogEdit: boolean = false;

  deleteEquipementDialog: boolean = false;

  equipementDialogAdd:boolean=false;

  maintenanceDialog : boolean=false;

  isDisabled: boolean = true; 

  equipement: Equipement = {
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

  selectedEquipement : any;
  
  equipements: Equipement[] = [];

  competences : Competence[] = [];
  
  etatsOptions : any[] =[];

  equipementFormEdit!: FormGroup;

  constructor(private equipementService:EquipementService,private messageService: MessageService,
              private competenceService : CompetenceService, private fb: FormBuilder,
              private router : Router,private authService: AuthService
  ) {
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
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
    
    this.equipementService.getEquipements().subscribe((data: any) => {
      this.equipements = data;
    },
    (error:any)=>{
      if(error.status===403){
        this.router.navigate(['/unAuthorized']);
      }
    });
  }
  }


  openNew() {
    this.equipementDialogAdd= true;
    this.etatsOptions = [
      { label: 'disponible', value: 'disponible' },
    ];
    this.competenceService.getCompetences().subscribe((data: any) => {
      this.competences = data;
    });
    

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  deleteEquipement(equipement: Equipement) {
    this.deleteEquipementDialog = true;
    this.equipement = { ...equipement };
  }

  confirmDelete() {
    this.deleteEquipementDialog = false;
    if (this.equipement && this.equipement.id) {
      this.equipementService.deleteEquipement(this.equipement.id).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'equipement supprimé', life: 3000 });
        this.loadEquipements();
      }, (error:any) => {
        console.error('Error deleting equipement:', error);
      });
    } else {
      console.error('Invalid equipement ID:', this.equipement);
    }
  }
  
  onAddEquipement(data : any) {
      this.equipementService.addEquipement(data).subscribe(() => {
        this.loadEquipements();
        this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'equipement créé', life: 3000 });
        this.equipementDialogAdd = false;
      }, (error:any) => {
        console.log(error);
        
      });
    }
  
  getEquipement(id: any) {
    this.equipementDialogEdit= true;
    this.etatsOptions = [
      { label: 'disponible', value: 'disponible' },
      { label: 'non disponible', value: 'non disponible' },
    ];
    this.competenceService.getCompetences().subscribe((data: any) => {
      this.competences = data;
    });
    this.equipementService.getEquipementById(id).subscribe(
      (data: any) => {
        const equipementData = data;
        console.log('Equipement récupéré:', data);
        equipementData.dateAchat = new Date(equipementData.dateAchat);
        this.selectedEquipement = equipementData;
          this.equipementDialogEdit = true;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du equipement !', error);
      }
    );
  }

  onUpdateEquipement(updatedData: any) {
    this.equipementService.updateEquipement(updatedData.id, updatedData).subscribe(() => {
      this.loadEquipements();
      this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Equipement actualisé', life: 3000 });
      this.equipementDialogEdit = false;
    },
    error => {
        console.error(error);
    })
      
    };

  loadEquipements() {
    this.equipementService.getEquipements().subscribe((data: any) => {
      this.equipements = data;
    });
  }

  hideDialogMaintenance(){
    this.maintenanceDialog=false;
  }

  openMaintenanceDialog(id : any){

    this.maintenanceDialog=true;
    this.etatsOptions = [
      { label: 'en maintenance', value: 'en maintenance' },
      { label: 'maintenance terminée', value: 'maintenance terminée' },

    ];

    this.equipementService.getEquipementById(id).subscribe(
      (data: any) => {
        const equipementData = data;
        console.log('Equipement récupéré:', data);
        equipementData.dateAchat = new Date(equipementData.dateAchat);

        this.equipementFormEdit.patchValue({
          id: equipementData.id,
          nom: equipementData.nom ,
          type : equipementData.type,
          etat : equipementData.etat,
          dateAchat : equipementData.dateAchat,
          competence : equipementData.competence?.id,
        });
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du equipement !', error);
      }
    );
  }
  updateMaintenance(){
    const equipementData = this.equipementFormEdit.value;
    equipementData.competence = {
      id: equipementData.competence
    };
    if(equipementData.etat === "maintenance terminée"){

      equipementData.etat="disponible";
    }
    const equipementEnvoye = {
      ... equipementData,
      etat : equipementData.etat} 
    const equipementId = equipementData.id;
    this.equipementService.updateEquipement(equipementId, equipementEnvoye).subscribe(() => {
      this.maintenanceDialog=false;
      this.loadEquipements();
      this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Equipement actualisé', life: 3000 });
      this.equipementDialogEdit = false;
    },
    error => {
        console.error(error);
    })
  }

}
