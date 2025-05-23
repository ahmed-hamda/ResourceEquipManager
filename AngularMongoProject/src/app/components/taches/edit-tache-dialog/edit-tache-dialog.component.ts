import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tache } from 'src/app/Models/Tache/Tache';

@Component({
  selector: 'app-edit-tache-dialog',
  templateUrl: './edit-tache-dialog.component.html',
  styleUrls: ['./edit-tache-dialog.component.scss']
})
export class EditTacheDialogComponent  implements OnInit {

  @Input() tacheDialogEdit: boolean = false;
  @Input() statusOptions :any;

  @Input() tache: Tache={
    nom: '',
    description: '',
    statut : '',
  };

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  tacheFormEdit!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.tacheFormEdit = this.fb.group({
       id: ['', Validators.required],
       nom: ['', Validators.required],
       description: ['', Validators.required],
       statut: ['', Validators.required],
    });
  }

  
  ngOnInit(): void {
    
  }

  ngOnChanges() {
    if (this.tacheFormEdit && this.tache) {
      this.tacheFormEdit.patchValue({
        id: this.tache.id,
        nom :this.tache.nom,
        description :this.tache.description,
        statut :this.tache.statut,
      });
      
    }
  }

  updateTache() {
    this.submitted = true;
    if (this.tacheFormEdit.invalid) {
      console.log('Le formulaire est invalide.');
      console.log(this.tacheFormEdit);
      
      return;
  }
    const tacheData = this.tacheFormEdit.value;
    this.save.emit(tacheData);
    this.submitted = false;
  }
  
  hideDialog() {
    this.close.emit();
  }
}

