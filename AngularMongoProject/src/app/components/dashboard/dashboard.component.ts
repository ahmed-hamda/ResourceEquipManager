import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AffectationService } from 'src/app/service/affectationService/affectaion.service';
import { Affectation } from 'src/app/Models/Affectation/Affectation';
import { EmployeService } from 'src/app/service/employesService/employe.service';
import { EquipementService } from 'src/app/service/equipementService/equipement.service';
import { TacheService } from 'src/app/service/tacheService/tache.service';
import { Employe } from 'src/app/Models/Employe/Employe';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/service/authService/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentDate: any;
  data1: any;
  options1: any;
  affectations: Affectation[] = [];

  totalEmployes=0;
  totalEquipements = 0;
  totalAffectations = 0;
  totalTaches = 0;
  

  constructor(
    private datePipe: DatePipe,
    private router : Router,
    private affectationService: AffectationService,
    private employeService : EmployeService,
    private equipementService : EquipementService,
    private tacheService : TacheService,
    private authService : AuthService
  ) {}

  ngOnInit() {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
    
    this.currentDate = this.datePipe.transform(new Date(), 'dd MMMM yyyy, EEE');

    this.employeService.getEmployes().subscribe((data:any) => 
      {this.totalEmployes = data.length},
    (error:any)=>{
      if(error.status===403){
        this.router.navigate(['/unAuthorized']);
      }
    });
    this.equipementService.getEquipements().subscribe((data:any) =>
       {this.totalEquipements = data.length},
    (error:any)=>{
      if(error.status===403){
        this.router.navigate(['/unAuthorized']);
      }
    });
    this.affectationService.getAffectations().subscribe((data:any) => 
      {this.totalAffectations = data.length},
    (error:any)=>{
      if(error.status===403){
        this.router.navigate(['/unAuthorized']);
      }
    });
    this.tacheService.getTaches().subscribe((data:any) => 
      {this.totalTaches = data.length},
    (error:any)=>{
      if(error.status===403){
        this.router.navigate(['/unAuthorized']);
      }
    });


    this.affectationService.getAffectations().subscribe((affectations: Affectation[]) => {
      this.affectations = affectations.filter((affectation:Affectation)=> affectation.statut==="terminé");
      console.log(this.affectations);
      
      // Maintenant générer les données pour le graphique
      const labels = this.affectations.map((aff: any) => `${aff.employe.nom} - ${aff.tache.nom}`);
      
      const dureePrevue = this.affectations.map((aff: any) => {
        const debut = new Date(aff.dateDebut);
        const fin = new Date(aff.dateFin);
        const diffInMs = Math.abs(fin.getTime() - debut.getTime());
        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
        return diffInDays;
      });

      const dureeReelle = this.affectations.map((aff: any) => {
        const debut = new Date(aff.dateDebut);
        const finReel = new Date(aff.dateFinReel);
        const diffInMs = Math.abs(finReel.getTime() - debut.getTime());
        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
        return diffInDays;
      });

      this.data1 = {
        labels: labels,
        datasets: [
          {
            label: 'Durée prévue (jours)',
            backgroundColor: '#42A5F5',
            data: dureePrevue
          },
          {
            label: 'Durée réelle (jours)',
            backgroundColor: '#FFA726',
            data: dureeReelle
          }
        ]
      };

      this.options1 = {
        scales: {
          x: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Comparaison durée prévue vs durée réelle par affectation'
          }
        }
      };
      

    },
    (error:any)=>{
      if(error.status===403){
        this.router.navigate(['/unAuthorized']);
      }
    });
  }
  }

  goTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
}

