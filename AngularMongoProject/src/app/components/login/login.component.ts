
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeService } from 'src/app/service/employesService/employe.service'; 
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout RH/service/app.layout.service';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/service/authService/auth.service';
import { JwtPayload } from 'src/app/Models/Payload/JwtPayload';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit {


    valCheck: string[] = ['remember'];

    
    public form = {
        username: '',
        password: '',
    }
    
    userInfo: JwtPayload | null = null;
    
    constructor(public layoutService: LayoutService,
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.userInfo = this.authService.getUserInfo();

        console.log(this.userInfo?.role);
        
        if (this.userInfo?.role==="ADMIN") {
            this.router.navigate(['/RH']);
          } else if (this.userInfo?.role==="USER"){
            this.router.navigate(['/Employe']);
          }  
    }
    onLogin() {

       
            this.authService.login({ username: this.form.username, password: this.form.password })
          .subscribe(
           (response) => {
                this.authService.saveToken(response.token)
                const role = this.authService.getRole();
                console.log(role);
                
                if (role === 'ADMIN') {
                  this.router.navigate(['/RH']);
                } else if (role === 'USER') {
                  this.router.navigate(['/Employe']);
                } else {
                  this.router.navigate(['/unAuthorized']); // fallback
                }
              },
              (err) => {
                console.error('Erreur de login', err);
              }
          );
          }
        
      

}