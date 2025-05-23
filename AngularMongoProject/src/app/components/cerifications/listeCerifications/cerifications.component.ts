import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Certification } from 'src/app/Models/Certification/Certification';
import { AuthService } from 'src/app/service/authService/auth.service';
import { CertificationService } from 'src/app/service/certificationService/certification.service';

@Component({
  selector: 'app-cerifications',
  templateUrl: './cerifications.component.html',
  styleUrls: ['./cerifications.component.scss']
})
export class CerificationsComponent {

  deleteCertificationDialog: boolean = false;
  
    certificationDialogAdd: boolean = false;
  
    certificationDialogEdit: boolean = false;
  
    certification: Certification = { 
      nom: '',
      dateAjout: new Date(),
     };
  
     selectedCertification : any; 
  
    rowsPerPageOptions = [5, 10, 15];
  
    lastId: number = 0;
  
    certifications: Certification[]=[];
  
   submitted: boolean = false;
  
   options: any;
    constructor(private messageService: MessageService, private certificationService : CertificationService,
      private router : Router, private authService : AuthService
    ) {
      
    }
  
    ngOnInit(): void {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/login']);
      } else {
      
      this.certificationService.getCertifications().subscribe((data: any) => {
        this.certifications = data;
      },
      (error:any)=>{
        if(error.status===403){
          this.router.navigate(['/unAuthorized']);
        }
      });
    }
    }
  
  
    openNew() {
      this.certificationDialogAdd = true;
    }
  
    deleteCertification(certification: Certification) {
      this.deleteCertificationDialog = true;
      this.certification = { ...certification };
    }
  
  
    confirmDelete() {
      this.deleteCertificationDialog = false;
      if (this.certification && this.certification.id) {
        this.certificationService.deleteCertification(this.certification.id).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'certification supprimé', life: 3000 });
          this.loadCertifications();
        }, error => {
          console.error('Error deleting certification:', error);
        });
      } else {
        console.error('Invalid certification ID:', this.certification);
      }
    }
  
    onAddCertification(data : any) {
      this.certificationService.addCertification(data).subscribe(() => {
        this.loadCertifications();
        this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'certification créé', life: 3000 });
        this.certificationDialogAdd = false;
      }, (error:any) => {
        console.log(error);
        
      });
    }
    getCertification(id: any) {
      this.certificationDialogEdit= true;
      this.certificationService.getCertificationById(id).subscribe(
        (data: any) => {
          console.log('certification récupéré:', data);
          const certificationData = data;
          this.selectedCertification = certificationData;
          this.certificationDialogEdit = true;
        },
        (error: any) => {
          console.error('Erreur lors de la récupération du certification !', error);
        }
      );
    }
  
    onUpdateCertification(updatedData: any) {
      this.certificationService.updateCertification(updatedData.id, updatedData).subscribe(() => {
        this.loadCertifications();
        this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'certification actualisé', life: 3000 });
        this.certificationDialogEdit = false;
      },
      error => {
          console.error('Erreur lors de la mise à jour de la certification:', error);
      })
        
      };
  
    loadCertifications() {
      this.certificationService.getCertifications().subscribe((data: any) => {
        this.certifications = data;
      });
    }
  
    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
