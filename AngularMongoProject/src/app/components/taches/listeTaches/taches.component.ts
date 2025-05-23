import { Component } from '@angular/core';
import { Tache } from 'src/app/Models/Tache/Tache';  
import { MessageService } from 'primeng/api';
import { TacheService } from 'src/app/service/tacheService/tache.service';  
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authService/auth.service';
@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.scss']
})
export class TachesComponent {

  deleteTacheDialog: boolean = false;

  tacheDialogAdd: boolean = false;

  tacheDialogEdit: boolean = false;

  tache: Tache = { 
    nom: '',
    description: '',
    statut : '',
   };

   selectedTache : any; 

  rowsPerPageOptions = [5, 10, 15];

  lastId: number = 0;

  taches: Tache[]=[];

 submitted: boolean = false;

 statusOptions : any[] =[];

  constructor(private messageService: MessageService, private tacheService : TacheService, private router : Router,
              private authService : AuthService
   ) {
    
  }

  ngOnInit(): void {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
    
    this.tacheService.getTaches().subscribe((data: any) => {
      this.taches = data;
    }),
    (error:any)=>{
      if(error.status===403){
        this.router.navigate(['/unAuthorized']);
      }
    };
  }
  }


  openNew() {
    this.tacheDialogAdd = true;
    this.statusOptions = [
      { label: 'non affectée', value: 'non affectée' },
    ];
  }

  deleteTache(tache: Tache) {
    this.deleteTacheDialog = true;
    this.tache = { ...tache };
  }


  confirmDelete() {
    this.deleteTacheDialog = false;
    if (this.tache && this.tache.id) {
      this.tacheService.deleteTache(this.tache.id).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'tache supprimé', life: 3000 });
        this.loadTaches();
      }, error => {
        console.error('Error deleting tache:', error);
      });
    } else {
      console.error('Invalid tache ID:', this.tache);
    }
  }

  onAddTache(data : any) {
    this.tacheService.addTache(data).subscribe(() => {
      this.loadTaches();
      this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'tache créé', life: 3000 });
      this.tacheDialogAdd = false;
    }, (error:any) => {
      console.log(error);
      
    });
  }
  getTache(id: any) {
    this.tacheDialogEdit= true;
    this.statusOptions = [
      { label: 'affectée', value: 'affectée' },
      { label: 'non affectée', value: 'non affectée' },
    ];
    this.tacheService.getTacheById(id).subscribe(
      (data: any) => {
        console.log('tache récupéré:', data);
        const tacheData = data;
        this.selectedTache = tacheData;
        this.tacheDialogEdit = true;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du tache !', error);
      }
    );
  }

  onUpdateTache(updatedData: any) {
    this.tacheService.updateTache(updatedData.id, updatedData).subscribe(() => {
      this.loadTaches();
      this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Tache actualisé', life: 3000 });
      this.tacheDialogEdit = false;
    },
    error => {
        console.error('Erreur lors de la mise à jour de la tache:', error);
    })
      
    };

  loadTaches() {
    this.tacheService.getTaches().subscribe((data: any) => {
      this.taches = data;
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
