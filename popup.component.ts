import {
  Component, Input, Output, EventEmitter, OnChanges, SimpleChanges
} from '@angular/core';
import { Party } from '../app/model/party';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnChanges {
  @Input() party: Party | null = null;
  @Input() isUpdateMode: boolean = false;
  @Input() visible: boolean = false;

  @Output() update = new EventEmitter<Party>();
  @Output() delete = new EventEmitter<Party>();
  @Output() add = new EventEmitter<Party>();
  @Output() close = new EventEmitter<void>();

  updatedParty: Party = this.getBlankParty();
  showForm = false;
  cancel: any;
  
 
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['party']) {
      if (this.party) {
        this.updatedParty = JSON.parse(JSON.stringify(this.party)); // deep clone
        this.isUpdateMode = true;
      } else {
        this.updatedParty = this.getBlankParty();
        this.isUpdateMode = false;
      }
      this.showForm = false; 
    }
  }
  showEditForm(): void {
    this.showForm = true;
    this.isUpdateMode = true;
  }
onDeleteClick(): void {
  const confirmDelete = confirm('Are you sure you want to delete this party?');
  if (confirmDelete && this.party?.id != null) {
    this.delete.emit(this.party); 
  }
}
    onCancelClick(): void {
    this.showForm = false;         
    this.close.emit();             
  }


  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    if (this.isUpdateMode) {
      this.update.emit(this.updatedParty);
    } else {
      this.add.emit(this.updatedParty);
    }

    this.showForm = false;
  }
  getBlankParty(): Party {
    return {
  id: null,
 _id: undefined,
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  genderIdentity: '',
  occupation: '',
  address: {
    city: '',
    state: '',
    country: ''
  },
  contactChannel: {
    phoneNumber: '',
    emailAddress: ''
  },



    };

}
}