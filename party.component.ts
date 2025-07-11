import { Component, OnInit } from '@angular/core';
import { PartyService } from '../../services/party.service';
import { Party } from '../model/party';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {
  parties: Party[] = [];

  showPopup = false;            
  showPopupForSave = false;      
  selectedParty: Party | null = null;
  newParty: Party = this.createEmptyParty();

  constructor(private partyService: PartyService) {}

  ngOnInit(): void {
    this.getParties();
  }

  
  getParties(): void {
    this.partyService.getAllParties().subscribe((data) => {
      this.parties = data;
    });
  }

  onActionClick(party: Party): void {
    this.selectedParty = party;
    this.showPopup = true;
  }

  openAddPartyPopup(): void {
    this.newParty = this.createEmptyParty(); 
    this.showPopupForSave = true;
  }

 handleSave(party: Party): void {
  console.log('Saving new party:', party);

  party.id = ''; 

  this.partyService.addParty(party).subscribe({
    next: () => {
      alert('Party added successfully!');
      this.getParties();
      this.showPopupForSave = false;
    },
    error: (err) => {
      console.error('Add failed', err);
      alert('Failed to add party.');
    }
  });
}


  handleUpdate(party: Party): void {
    this.partyService.updateParty(party).subscribe(() => {
      alert('Party updated successfully!');
      this.getParties();
      this.closePopup();
    });
  }

  onDelete(party: Party): void {
  const id = String(party.partyId || party.id);  // safely convert to string
  if (!id) {
    alert('Party ID is missing. Cannot delete.');
    return;
  }

  this.partyService.deleteParty(id).subscribe(() => {
    alert('Party deleted');
    this.getParties();
    this.closePopup();
  });
}


  handleCancel(): void {
  this.showPopupForSave = false; 
}


 closePopup(): void {
  this.showPopup = false;
  this.selectedParty = null;
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


  formatDate(dob: string): string {
    if (!dob) return 'N/A';
    const date = new Date(dob);
    return `${String(date.getDate()).padStart(2, '0')}/${
      String(date.getMonth() + 1).padStart(2, '0')
    }/${date.getFullYear()}`;
  }
}
