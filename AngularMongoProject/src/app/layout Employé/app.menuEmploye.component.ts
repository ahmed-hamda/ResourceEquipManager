import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { EmployeService } from '../service/employesService/employe.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/authService/auth.service';



@Component({
    selector: 'app-menu-employe',
    templateUrl: './app.menuEmploye.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    loggedIn: boolean = false;

    constructor(public layoutService: LayoutService, private authService : AuthService,private router:Router) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Accueil',
                items: [
                    { label: 'Affectations', icon: 'pi pi-truck', routerLink: ['/Employe'] }
                ]
            },
            {
                items: [
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
                    { label: '', icon: '', routerLink: [''] },
                    { label: '', icon: '', routerLink: [''] },
                    { label: '', icon: '', routerLink: [''] },
                    { label: '', icon: '', routerLink: [''] },

                    {label: 'Logout', icon: 'pi pi-sign-out', routerLink: ['/login'],  command: this.logout.bind(this)}

                ]

            },
          ];
    }
    logout() {
        this.authService.logout();
    }

}
