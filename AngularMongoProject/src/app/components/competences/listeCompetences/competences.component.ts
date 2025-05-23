import { Component } from '@angular/core';
import { Competence } from 'src/app/Models/Competence/Competence'; 
import { MessageService } from 'primeng/api';
import { CompetenceService } from 'src/app/service/competenceService/competence.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { CertificationService } from 'src/app/service/certificationService/certification.service';
import { Certification } from 'src/app/Models/Certification/Certification';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authService/auth.service';

@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.scss']
})
export class CompetencesComponent {
  
  deleteCompetenceDialog: boolean = false;

  competenceDialogAdd: boolean = false;

  competenceDialogEdit: boolean = false;

  competence: Competence = {
    nom : '',
    type : '',
    certifications:[]
  };

  rowsPerPageOptions = [5, 10, 15];

  lastId: number = 0;

  competences: Competence[]=[];

  certifications : Certification[]=[];

  selectedCompetence: any; 

 submitted: boolean = false;

  constructor(private messageService: MessageService, private competenceService : CompetenceService,
              private certificationService : CertificationService, private router : Router,
              private authService : AuthService
   ) {
      
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
    
    this.competenceService.getCompetences().subscribe((data: any) => {
      this.competences = data;
    },
    (error:any)=>{
      if(error.status===403){
        this.router.navigate(['/unAuthorized']);
      }
    });    
  }
  }


  openNew() {
    this.certificationService.getCertifications().subscribe((data: any) => {
      this.certifications = data;
    });
    this.competenceDialogAdd = true;
  }

  deleteCompetence(competence: Competence) {
    this.deleteCompetenceDialog = true;
    this.competence = { ...competence };
  }

  confirmDelete() {
    this.deleteCompetenceDialog = false;
    if (this.competence && this.competence.id) {
      this.competenceService.deleteCompetence(this.competence.id).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'competence supprimé', life: 3000 });
        this.loadCompetence();
      }, (error:any) => {
        console.error('Error deleting competence:', error);
      });
    } else {
      console.error('Invalid competence ID:', this.competence);
    }
  }

  onAddCompetence(data : any) {
    this.competenceService.addCompetence(data).subscribe(() => {
      this.loadCompetence();
      this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'competence créé', life: 3000 });
      this.competenceDialogAdd = false;
    }, (error:any) => {
      console.log(error);
      
    });
  }
  getCompetence(id: any) {
    this.competenceDialogEdit= true;
    this.certificationService.getCertifications().subscribe((data: any) => {
      this.certifications = data;
    });
    this.competenceService.getCompetenceById(id).subscribe(
      (data: any) => {
        console.log('competence récupéré:', data);
        const competenceData = data;
        competenceData.certifications = competenceData.certifications?.map((c: any) => c?.id);
          this.selectedCompetence = competenceData;
          this.competenceDialogEdit = true;
        
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du competence !', error);
      }
    );
  }

  onUpdateCompetence(updatedData: any) {
    this.competenceService.updateCompetence(updatedData.id, updatedData).subscribe(() => {
      this.loadCompetence();
      this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Competence actualisé', life: 3000 });
      this.competenceDialogEdit = false;
    },
    error => {
        console.error(error);
    })
      
    };

  loadCompetence() {
    this.competenceService.getCompetences().subscribe((data: any) => {
      this.competences = data;
    });
  }
  
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
