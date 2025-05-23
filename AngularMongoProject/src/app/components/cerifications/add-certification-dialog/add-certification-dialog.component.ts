import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Certification } from 'src/app/Models/Certification/Certification';

@Component({
  selector: 'app-add-certification-dialog',
  templateUrl: './add-certification-dialog.component.html',
  styleUrls: ['./add-certification-dialog.component.scss']
})
export class AddCertificationDialogComponent {


  @Input() certificationDialogAdd: boolean = false;
  certification: Certification = {
    nom: '',
    dateAjout: new Date(),
  };

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  certificationForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.certificationForm = this.fb.group({
      nom: ['', Validators.required],
      dateAjout: ['', Validators.required],
    });
  }


  ngOnInit(): void {

  }

  addCertification() {
    this.submitted = true;
    if (this.certificationForm.invalid) {
      console.log('Le formulaire est invalide.');
      console.log(this.certificationForm);

      return;
    }
    const certificationData = this.certificationForm.value;

    const dateO = new Date(certificationData.dateAjout);
    dateO.setDate(dateO.getDate() + 1);
    certificationData.dateAjout = dateO;

    this.save.emit(certificationData);
    this.submitted = false;
    this.certificationForm.reset()

  }

  hideDialog() {
    this.close.emit();
    this.submitted = false;
    this.certificationForm.reset()

  }
}
