import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from "primeng/multiselect";
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CalendarModule } from "primeng/calendar";
import { LoginComponent } from './components/login/login.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { ChipModule } from 'primeng/chip';
import { EmployesComponent } from './components/employes/listeEmployes/employes.component';
import { AppLayoutModule } from './layout RH/app.layoutRH.module';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ImageModule } from 'primeng/image';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AffectationsComponent } from './components/affectations/listeAffectations/affectations.component';
import { RippleModule } from 'primeng/ripple';
import { EquipementsComponent } from './components/equipements/listeEquipements/equipements.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AppLayoutModuleEmploye } from './layout Employé/app.layoutEmploye.module';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ChartModule } from 'primeng/chart';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CompetencesComponent } from './components/competences/listeCompetences/competences.component';
import { TachesComponent } from './components/taches/listeTaches/taches.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DatePipe } from '@angular/common';
import { EditEmployeDialogComponent } from './components/employes/edit-employe-dialog/edit-employe-dialog.component';
import { EditEquipementDialogComponent } from './components/equipements/edit-equipement-dialog/edit-equipement-dialog.component';
import { EditTacheDialogComponent } from './components/taches/edit-tache-dialog/edit-tache-dialog.component';
import { EditCompetenceDialogComponent } from './components/competences/edit-competence-dialog/edit-competence-dialog.component';
import { EditAffectationDialogComponent } from './components/affectations/edit-affectation-dialog/edit-affectation-dialog.component';
import { AddEquipementDialogComponent } from './components/equipements/add-equipement-dialog/add-equipement-dialog.component';
import { AddEmployeDialogComponent } from './components/employes/add-employe-dialog/add-employe-dialog.component';
import { AddAffectationDialogComponent } from './components/affectations/add-affectation-dialog/add-affectation-dialog.component';
import { AddTacheDialogComponent } from './components/taches/add-tache-dialog/add-tache-dialog.component';
import { AddCompetenceDialogComponent } from './components/competences/add-competence-dialog/add-competence-dialog.component';
import { AddCertificationDialogComponent } from './components/cerifications/add-certification-dialog/add-certification-dialog.component';
import { EditCertificationDialogComponent } from './components/cerifications/edit-certification-dialog/edit-certification-dialog.component';
import { CerificationsComponent } from './components/cerifications/listeCerifications/cerifications.component'; 
import { AffectationByEmployeComponent } from './components/affectation-by-employe/affectation-by-employe.component';
import { UnAuthorizedComponent } from './components/un-authorized/un-authorized.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './service/authService/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    LoginComponent,
    EmployesComponent,
    AffectationsComponent,
    EquipementsComponent,
    DashboardComponent,
    CompetencesComponent,
    TachesComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    EditEmployeDialogComponent,
    EditEquipementDialogComponent,
    EditTacheDialogComponent,
    EditCompetenceDialogComponent,
    EditAffectationDialogComponent,
    AddEquipementDialogComponent,
    AddEmployeDialogComponent,
    AddAffectationDialogComponent,
    AddTacheDialogComponent,
    AddCompetenceDialogComponent,
    AddCertificationDialogComponent,
    EditCertificationDialogComponent,
    CerificationsComponent,
    AffectationByEmployeComponent,
    UnAuthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    BrowserAnimationsModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    AppLayoutModuleEmploye,
    ReactiveFormsModule,
    InputTextModule,
    AppLayoutModule,
    InputNumberModule,
    MultiSelectModule,
    CalendarModule,
    CheckboxModule,
    PasswordModule,
    ChipModule,
    ButtonModule,
    AvatarGroupModule,
    AvatarModule,
    ScrollTopModule,
    ScrollPanelModule,
    ImageModule,
    FullCalendarModule,
    ToggleButtonModule,
    RippleModule,
    SplitButtonModule,
    ColorPickerModule,
    ChartModule,
    DropdownModule,

  ],
  providers: [MessageService,DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],

  bootstrap: [AppComponent]
})
export class AppModule {
  
}

