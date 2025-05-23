import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { EmployesComponent } from './components/employes/listeEmployes/employes.component'; 
import { AppLayoutComponentEmploye } from './layout Employé/app.layoutEmploye.component';
import { AppLayoutComponent } from './layout RH/app.layoutRH.component';
import { AffectationsComponent } from './components/affectations/listeAffectations/affectations.component';
import { EquipementsComponent } from './components/equipements/listeEquipements/equipements.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CompetencesComponent } from './components/competences/listeCompetences/competences.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { TachesComponent } from './components/taches/listeTaches/taches.component'; 
import { CerificationsComponent } from './components/cerifications/listeCerifications/cerifications.component';
import { AffectationByEmployeComponent } from './components/affectation-by-employe/affectation-by-employe.component';
import { UnAuthorizedComponent } from './components/un-authorized/un-authorized.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'RH', component: AppLayoutComponent,
    children: [
      {path: '', component: DashboardComponent },
      {path: 'employes', component: EmployesComponent },
      {path:'affectations', component: AffectationsComponent},
      {path:'equipements', component: EquipementsComponent},
      {path:'competences', component:CompetencesComponent},
      {path:'taches', component:TachesComponent},
      {path:'certifications', component:CerificationsComponent},
      

    ]
  },
  {
    path: 'Employe', component: AppLayoutComponentEmploye,
    children: [
      {path: '', component: AffectationByEmployeComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'unAuthorized', component: UnAuthorizedComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
