import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/Models/Employe/Employe'; 
import { EmployeService } from 'src/app/service/employesService/employe.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { CompetenceService } from 'src/app/service/competenceService/competence.service';
import { Competence } from 'src/app/Models/Competence/Competence';
import { AuthService } from 'src/app/service/authService/auth.service';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.scss']
})
export class EmployesComponent implements OnInit {

  employe: Employe = {
    nom: '',
    prenom: '',
    cin: 0,
    email: '',
    password:'',
    role:'',
    competences: []
  };

  employes: Employe[] = [];

  competences: Competence[] = [];

  submitted = false;

  selectedEmploye: any;

  employeDialogAdd: boolean = false;

  employeDialogEdit: boolean = false;

  deleteEmployeDialog: boolean = false;

  rowsPerPageOptions = [5, 10, 15];


  constructor(private messageService: MessageService, private router: Router,
    private employeService: EmployeService, private competenceService: CompetenceService, private authService : AuthService) {
  }
  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
    
    this.employeService.getEmployes().subscribe((data: any) => {
      this.employes = data;
    },
    (error:any)=>{
      if(error.status===403){
        this.router.navigate(['/unAuthorized']);
      }
    });
  }
  }
  openNew() {
    this.employeDialogAdd = true;
    this.competenceService.getCompetences().subscribe((data: any) => {
      this.competences = data;
    });
  }

  onAddEmploye(data: any) {
    this.employeService.addEmploye(data).subscribe(() => {
      this.loadEmployes();
      this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'employé créé', life: 3000 });
      this.employeDialogAdd = false;
    }, (error: any) => {
      console.log(error);

    });
  }

  onUpdateEmploye(updatedData: any) {
    this.employeService.updateEmploye(updatedData.id, updatedData).subscribe(() => {
      this.loadEmployes();
      this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Employé actualisé', life: 3000 });
      this.employeDialogEdit = false;
    },
      error => {
        console.error('Erreur lors de la mise à jour de l\'employe:', error);
      })

  };


  deleteEmploye(employe: Employe) {
    this.deleteEmployeDialog = true;
    this.employe = { ...employe };
  }

  confirmDelete() {
    this.deleteEmployeDialog = false;
    if (this.employe && this.employe.id) {
      this.employeService.deleteEmploye(this.employe.id).subscribe(() => {
        this.loadEmployes();
        this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'employé supprimé', life: 3000 });
      });
    } else {
      console.error('Invalid employe ID:', this.employe);
    }
  }

  getEmploye(id: number) {
    this.employeDialogEdit = true;
    this.competenceService.getCompetences().subscribe((data: any) => {
      this.competences = data;
    });
    this.employeService.getEmployeById(id).subscribe(
      (response: any) => {
        console.log('Réponse de l\'API:', response);
        const employeData = response;
        console.log('Données employé récupérées:', employeData);
        employeData.competences = employeData.competences.map((c: any) => c.id);
        this.selectedEmploye = employeData;
        this.employeDialogEdit = true;

      },
      (error: any) => {
        console.error('Erreur lors de la récupération de l\'employe:', error);
      }
    );
  }

  loadEmployes(): void {
    this.employeService.getEmployes().subscribe((employes: any) => {
      this.employes = employes;
    });
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


}
