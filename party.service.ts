import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Party } from '../app/model/party';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  private baseUrl = 'http://localhost:8080/party';

  constructor(private http: HttpClient) {}


  getAllParties(): Observable<Party[]> {
    return this.http.get<Party[]>(this.baseUrl);
  }

 
  addParty(party: Party): Observable<Party> {
    
    const newParty = { ...party, id: null };
    return this.http.post<Party>(this.baseUrl, newParty);
  }

  updateParty(party: Party): Observable<Party> {
    if (!party.id || party.id.trim() === '') {
      throw new Error('Cannot update party without a valid ID.');
    }
    return this.http.put<Party>(this.baseUrl, party);
  }

  deleteParty(partyId: string | number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${partyId}`);
}

}
