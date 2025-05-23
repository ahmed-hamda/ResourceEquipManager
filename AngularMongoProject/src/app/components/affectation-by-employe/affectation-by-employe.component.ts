import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Affectation } from 'src/app/Models/Affectation/Affectation';
import { JwtPayload } from 'src/app/Models/Payload/JwtPayload';
import { AffectationService } from 'src/app/service/affectationService/affectaion.service';
import { AuthService } from 'src/app/service/authService/auth.service';

@Component({
  selector: 'app-affectation-by-employe',
  templateUrl: './affectation-by-employe.component.html',
  styleUrls: ['./affectation-by-employe.component.scss']
})
export class AffectationByEmployeComponent implements OnInit {

  constructor(private affectationService: AffectationService, private fb: FormBuilder, private messageService : MessageService,
              private router: Router,private authService : AuthService
  ) {
    this.affectationFormEdit = this.fb.group({
      id: ['', Validators.required],
      statut: ['']
    });
  }

  affectations: Affectation[] = [];
  affectationFormEdit!: FormGroup;
  selectedAffectation: any;
  statutDialog: boolean = false;
  statusOptions : any;
   userInfo: JwtPayload | null = null;
  ngOnInit(): void {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
    
      this.userInfo = this.authService.getUserInfo();
      
      this.affectationService.getAffectationByEmployeId(this.userInfo?.id).subscribe((affectations: any) => {
      
      this.affectations = affectations;

    },
    (error:any)=>{
      if(error.status===403){
        this.router.navigate(['/unAuthorized']);
      }
    });
  }
  }

  openStatutDialog(id: any) {
    this.statutDialog = true;
    this.statusOptions = [
      { label: 'en cours', value: 'en cours' },
      { label: 'terminé', value: 'terminé' },
    ];
    
    this.affectationService.getAffectationById(id).subscribe(
      (data: any) => {
        this.selectedAffectation = data;
        this.affectationFormEdit.patchValue({
          id: data.id,
          statut: data.statut, // SEULEMENT statut ici
        });
      }
    )
  }
  

  updateAffectation() {
    if (this.affectationFormEdit.invalid) {
      console.log('Le formulaire est invalide.');
      console.log(this.affectationFormEdit);
      return;
    }
  
    const newStatut = this.affectationFormEdit.value.statut;
    const date = new Date();
    date.setDate(date.getDate() + 1)
    const updatedAffectation = {
      ...this.selectedAffectation, // Toutes les anciennes données récupérées
      statut: newStatut,            // Seul statut est modifié
      dateFinReel: date,      // Tu veux mettre la date de fin réelle à maintenant
    };
  
    // Maintenant tu envoies tout proprement
    this.affectationService.updateAffectation(updatedAffectation.id, updatedAffectation).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Affectation actualisée', life: 3000 });
      this.loadAffectations();
      this.statutDialog = false;
    }, error => {
      console.error(error);
    });
  }

  loadAffectations() {
    this.affectationService.getAffectationByEmployeId(this.userInfo?.id).subscribe((data: any) => {
      this.affectations = data;
    });
  }

  hideDialog(){
    this.statutDialog=false;
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
  
}
