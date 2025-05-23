import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { EmployeService } from 'src/app/service/employesService/employe.service'; 
import { Router } from '@angular/router';
import { TokenService } from '../../service/token.service';
import { AuthService } from 'src/app/service/authService/auth.service';

@Component({
    selector: 'app-menu-rh',
    templateUrl: './app.menuRH.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    loggedIn: boolean = false;

    constructor(public layoutService: LayoutService, private employeService:EmployeService,private router:Router, private authService : AuthService) { }

    ngOnInit() {
        this.model = [
              {
                label: 'Accueil',
                items: [
                    {  label: 'Tableau de bord', icon: 'pi pi-fw pi-home', routerLink: ['/RH'] },
                ]
            },
            {
                label: 'Paramétrage',
                items: [
                    { label: 'Liste des employés', icon: 'pi pi-fw pi-users', routerLink: ['/RH/employes'] },
                    { label: 'Liste des equipements', icon: 'pi pi-fw  pi pi-car', routerLink: ['/RH/equipements'] },
                    { label: 'Liste des affectation', icon: 'pi pi-fw pi-list', routerLink: ['/RH/affectations'] },
                    { label: 'Liste des tâches', icon: 'pi pi-fw pi-file', routerLink: ['/RH/taches'] },
                    { label: 'Liste des compétences', icon: 'pi pi-fw pi-pencil', routerLink: ['/RH/competences'] },
                    { label: 'Liste des certifications', icon: 'pi pi-fw pi-file', routerLink: ['/RH/certifications'] },
                    { label: '', icon: '', routerLink: [''] },
                    { label: '', icon: '', routerLink: [''] },
                    { label: '', icon: '', routerLink: [''] },
                    { label: '', icon: '', routerLink: [''] },
                    { label: '', icon: '', routerLink: [''] },
                    { label: '', icon: '', routerLink: [''] },
                    { label: '', icon: '', routerLink: [''] },
                    { label: '', icon: '', routerLink: [''] },
                    { label: '', icon: '', routerLink: [''] },
                    { label: '', icon: '', routerLink: [''] },
                    { label: '', icon: '', routerLink: [''] },
                    { label: '', icon: '', routerLink: [''] },
                    { label: '', icon: '', routerLink: [''] },
                    { label: '', icon: '', routerLink: [''] },
                    { label: '', icon: '', routerLink: [''] },
                    { label: '', icon: '', routerLink: [''] },
                    {label: 'Logout', icon: 'pi pi-fw pi-sign-out', routerLink: ['/login'],  command: this.logout.bind(this)}
                ]
            },
          ];
    }
    logout() {

      this.authService.logout();
    }

}
