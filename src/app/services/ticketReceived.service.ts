import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getLocaleDateTimeFormat } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TicketReceivedService {

  uri = 'http://localhost:4000/ticketReceived';

  constructor(private http: HttpClient) { }

  /*GenerateTicket(ticket_no, asset_serial, identified_issue, criticality_rating, ticket_branch, authorized_person, sender, ticket_status) {
    const obj = {
        ticket_no: ticket_no,
        asset_serial: asset_serial,
        identified_issue: identified_issue,
        criticality_rating: criticality_rating,
        ticket_branch: ticket_branch,
        authorized_person: authorized_person,
        sender: sender,
        ticket_status: ticket_status,
        

    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }*/

  /*getSubmitTicket() {
    
    return this.http.get(`${this.uri}/ticketSubmitted`);
    
    }*/



  viewReceivedTicket(id) {
    return this
            .http
            .get(`${this.uri}/view/${id}`);
    }

    /*showAsset(asset_serial) {
        return this
                .http
                .get(`${this.uri}/search/${asset_serial}`);
        }*/

    ReceiveTicket(ticket_no, received_by,ticket_status, id) {

    const obj = {
      
      received_by: received_by,
      ticket_status: ticket_status,
      ticket_received_date: Date.now()

      };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  UpdateTicket(ticket_no, ticket_status, tracking_status, id) {

    const obj = {
      
      ticket_status: ticket_status,
      tracking_status: tracking_status

      };
    this
      .http
      .post(`${this.uri}/update1/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  /*getTicketNo(){
    return this.http.get(`${this.uri}/show`);
  }*/



}
