import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Certification } from 'src/app/Models/Certification/Certification';

@Component({
  selector: 'app-edit-certification-dialog',
  templateUrl: './edit-certification-dialog.component.html',
  styleUrls: ['./edit-certification-dialog.component.scss']
})
export class EditCertificationDialogComponent {

   @Input() certificationDialogEdit: boolean = false;
    @Input() certification: Certification={
      nom: '',
      dateAjout: new Date(),
    };
  
    @Output() close = new EventEmitter<void>();
    @Output() save = new EventEmitter<any>();
  
    certificationFormEdit!: FormGroup;
    submitted = false;
  
    constructor(private fb: FormBuilder) {
      this.certificationFormEdit = this.fb.group({
         id: ['', Validators.required],
         nom: ['', Validators.required],
         dateAjout: ['', Validators.required],
      });
    }
  
    
    ngOnInit(): void {
      
    }
  
    ngOnChanges() {
      if (this.certificationFormEdit && this.certification) {

        const dateO = new Date(this.certification.dateAjout);
          dateO.setDate(dateO.getDate()); // Ajouter 1 jour
          this.certification.dateAjout = dateO;
          
        this.certificationFormEdit.patchValue({
          id: this.certification.id,
          nom :this.certification.nom,
          dateAjout :this.certification.dateAjout,
        });
        
      }
    }
  
    updateCertification() {
      this.submitted = true;
      if (this.certificationFormEdit.invalid) {
        console.log('Le formulaire est invalide.');
        console.log(this.certificationFormEdit);
        
        return;
    }
      const certificationData = this.certificationFormEdit.value;
      this.save.emit(certificationData);
      this.submitted = false;
    }
    
    hideDialog() {
      this.close.emit();
    }
}
