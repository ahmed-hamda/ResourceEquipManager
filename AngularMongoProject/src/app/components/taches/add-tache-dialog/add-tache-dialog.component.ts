import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tache } from 'src/app/Models/Tache/Tache';

@Component({
  selector: 'app-add-tache-dialog',
  templateUrl: './add-tache-dialog.component.html',
  styleUrls: ['./add-tache-dialog.component.scss']
})
export class AddTacheDialogComponent implements OnInit {

  @Input() tacheDialogAdd: boolean = false;
  @Input() statusOptions :any;

  tache: Tache={
    nom: '',
    description: '',
    statut : '',
  };

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  tacheForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
     this.tacheForm = this.fb.group({
          nom: ['', Validators.required],
          description: ['', Validators.required],
          statut: ['', Validators.required],
        });
  }

  
  ngOnInit(): void {
    
  }

  addTache() {
    this.submitted = true;
    if (this.tacheForm.invalid) {
      console.log('Le formulaire est invalide.');
      console.log(this.tacheForm);
      
      return;
  }
    const tacheData = this.tacheForm.value;
    this.save.emit(tacheData);
    this.submitted = false;
    this.tacheForm.reset()

  }
  
  hideDialog() {
    this.close.emit();
    this.submitted = false;
    this.tacheForm.reset()

  }
}



