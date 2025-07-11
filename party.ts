export interface Party {
 _id?: string; 
  id: any;
  partyId?: number;
  firstName: string;
  lastName: string;
  dateOfBirth:  string;
  genderIdentity: string;
  occupation: string;
  address: Address;
  contactChannel: ContactChannel;
}

export interface Address {
  city: string;
  state: string;
  country: string;
}

export interface ContactChannel {
  phoneNumber: string;
  emailAddress?: string;
}
