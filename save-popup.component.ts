import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Party } from '../app/model/party';

@Component({
  selector: 'app-add-party-popup',
  templateUrl: './save-popup.component.html',
  styleUrls: ['./save-popup.component.css']
})
export class AddPartyPopupComponent implements OnChanges{
   @Input() party!: Party;
  @Output() save = new EventEmitter<Party>();
  @Output() cancel = new EventEmitter<void>();

   newParty: Party = this.createEmptyParty();
  showPopupForSave: boolean;
  constructor() {
  this.showPopupForSave = false;
}

  
   
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['party'] && this.party) {
      this.newParty = JSON.parse(JSON.stringify(this.party));
    }
  }

  
   createEmptyParty(): Party {
    return {
      id: '',
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
      }
    };
  }

  onSave(): void {
    console.log('Save clicked');
    this.save.emit(this.newParty);
  }

  openAddPartyPopup(): void {
  this.newParty = this.createEmptyParty(); // ✅ reset party
  this.showPopupForSave = true;
}

 
  onCancel(): void {
    console.log('Cancel clicked');
    this.cancel.emit();
  }
}
