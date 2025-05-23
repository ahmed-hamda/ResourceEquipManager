import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Certification } from 'src/app/Models/Certification/Certification';
import { Competence } from 'src/app/Models/Competence/Competence';
import { Employe } from 'src/app/Models/Employe/Employe';
import { CompetenceService } from 'src/app/service/competenceService/competence.service';

@Component({
  selector: 'app-add-employe-dialog',
  templateUrl: './add-employe-dialog.component.html',
  styleUrls: ['./add-employe-dialog.component.scss']
})
export class AddEmployeDialogComponent implements OnInit {

  @Input() employeDialogAdd: boolean = false;
  employe: Employe = {
    nom: '',
    prenom: '',
    cin: 0,
    email: '',
    competences: [],
    password: '',
    role: ''
  };
  @Input() competences: Competence[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  selectedCompetenceCertifications: Certification[] = [];
  selectedCompetences : Competence []= [];
  employeForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private competenceService : CompetenceService) {
    this.employeForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cin: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      competences: [[]],
      role:['']
    });
  }


  ngOnInit(): void {

  }

  addEmploye() {
    this.submitted = true;
    if (this.employeForm.invalid) {
      console.log('Le formulaire est invalide.');
      return;
    }
  
    const formValues = this.employeForm.value;
  
    // Recréer la liste des compétences avec seulement les certifications cochées
    const competencesAvecCertifs = this.selectedCompetences.map(comp => {
      return {
        id: comp.id,
        nom: comp.nom,
        type: comp.type,
        certifications: comp.certifications.filter(certif =>
          this.selectedCompetenceCertifications.some(selected => selected.id === certif.id)
        )
      };
    });
  
    const employeData = {
      nom: formValues.nom,
      prenom: formValues.prenom,
      email: formValues.email,
      cin: formValues.cin,
      competences: competencesAvecCertifs,
      role : formValues.role
    };
  
    console.log('Employé prêt à envoyer :', employeData);
  
    employeData.role="USER"
    this.save.emit(employeData);
    this.submitted = false;
    this.employeForm.reset();
    this.selectedCompetenceCertifications = [];
    this.selectedCompetences = [];
  }
  

  hideDialog() {
    this.close.emit();
    this.submitted = false;
    this.employeForm.reset();
    this.selectedCompetenceCertifications = [];
    this.selectedCompetences = [];

  }

  onCompetenceChange(event: any) {
    const selectedCompetenceIds = event.value;
    console.log('IDs des compétences sélectionnées:', selectedCompetenceIds);
  
    // Récupérer les objets complets des compétences sélectionnées
    this.selectedCompetences = this.competences.filter(comp => selectedCompetenceIds.includes(comp.id));
  
    console.log('Compétences complètes sélectionnées:', this.selectedCompetences);
  

  }
  
  

  // Méthode pour récupérer les certifications des compétences sélectionnées
  getCertificationsFromCompetences(competences: Competence[]): Certification[] {
    const certifications: Certification[] = [];
    
    competences.forEach(comp => {
      const competenceFromDb = this.competences.find(c => c.id === comp.id);
      if (competenceFromDb) {
        // Ajouter les certifications de cette compétence
        certifications.push(...competenceFromDb.certifications);
      }
    });
    console.log('Certifications récupérées:', certifications); // Vérifie les certifications récupérées

    return certifications;
  }

  isCertificationSelected(certif: Certification): boolean {
    return this.selectedCompetenceCertifications.some(selectedCert => selectedCert.id === certif.id);
  }

  onCertificationToggle(certif: Certification) {
    if (this.isCertificationSelected(certif)) {
      this.selectedCompetenceCertifications = this.selectedCompetenceCertifications.filter(selectedCert => selectedCert.id !== certif.id);
    } else {
      this.selectedCompetenceCertifications.push(certif);
    }
    
  }
  
  
  
}



