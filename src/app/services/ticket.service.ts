import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  uri = 'http://localhost:4000/createTicket';

  constructor(private http: HttpClient) { }

  GenerateTicket(ticket_no, asset_serial, identified_issue, criticality_rating, ticket_branch, authorized_person, sender,sender_name, ticket_status, tracking_status) {
    const obj = {
        ticket_no: ticket_no,
        asset_serial: asset_serial,
        identified_issue: identified_issue,
        criticality_rating: criticality_rating,
        ticket_branch: ticket_branch,
        authorized_person: authorized_person,
        sender: sender,
        sender_name: sender_name,
        ticket_status: ticket_status,
        tracking_status: tracking_status,
        ticket_create_date: Date.now()
        

    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  getSubmitTicket() {
    
    return this.http.get(`${this.uri}/ticketSubmitted`);
    
    }

  getReceivedTicket() {
  
    return this.http.get(`${this.uri}/ticketReceived`);
    
    }

  getOpenedTicket() {

    return this.http.get(`${this.uri}/ticketOpened`);
    
    }

  getClosedTicket() {

    return this.http.get(`${this.uri}/ticketClosed`);
    
    }

  getTicketDetails(ticket_no) {
    return this
            .http
            .get(`${this.uri}/searchTicket/${ticket_no}`);
    }

  /*editEmployee(id) {
    return this
            .http
            .get(`${this.uri}/edit/${id}`);
    }*/

    showAsset(asset_serial) {
        return this
                .http
                .get(`${this.uri}/search/${asset_serial}`);
        }

    UpdateTicketVendor(ticket_status, ticket_no) {

    const obj = {
      ticket_status: ticket_status

      };
    this
      .http
      .post(`${this.uri}/updateTicketVendor/${ticket_no}`, obj)
      .subscribe(res => console.log('Done'));
  }

  UpdateTicketQuotation(ticket_status, ticket_no) {

    const obj = {
      ticket_status: ticket_status

      };
    this
      .http
      .post(`${this.uri}/UpdateTicketQuotation/${ticket_no}`, obj)
      .subscribe(res => console.log('Done'));
  }

  UpdateTicketApproval(ticket_status, ticket_no) {

    const obj = {
      ticket_status: ticket_status

      };
    this
      .http
      .post(`${this.uri}/UpdateTicketApproval/${ticket_no}`, obj)
      .subscribe(res => console.log('Done'));
  }

  UpdateTicketPayment(ticket_status, ticket_no) {

    const obj = {
      ticket_status: ticket_status

      };
    this
      .http
      .post(`${this.uri}/UpdateTicketPayment/${ticket_no}`, obj)
      .subscribe(res => console.log('Done'));
  }

  UpdateTicketVendorReceived(ticket_status, ticket_no) {

    const obj = {
      ticket_status: ticket_status

      };
    this
      .http
      .post(`${this.uri}/UpdateTicketVendorReceived/${ticket_no}`, obj)
      .subscribe(res => console.log('Done'));
  }

  UpdateTicketInhouseClose(ticket_status, ticket_no) {

    const obj = {
      ticket_status: ticket_status

      };
    this
      .http
      .post(`${this.uri}/UpdateTicketInhouseClose/${ticket_no}`, obj)
      .subscribe(res => console.log('Done'));
  }

  getTicketNo(){
    return this.http.get(`${this.uri}/show`);
  }

  CloseTicket(ticket_closing_comment, ticket_no, ticket_status, tracking_status) {

    const obj = {
      ticket_closing_comment: ticket_closing_comment,
      ticket_status: ticket_status,
      tracking_status: tracking_status,
      ticket_closing_date: Date.now()

      };
    this
      .http
      .post(`${this.uri}/closeTicket/${ticket_no}`, obj)
      .subscribe(res => console.log('Done'));
  }

  getSubmitCount() {

    return this.http.get(`${this.uri}/submitCount`);
    
    }

  getReceiveCount() {

    return this.http.get(`${this.uri}/receiveCount`);
    
    }

  getOpenCount() {

    return this.http.get(`${this.uri}/openCount`);
    
    }

  getCloseCount() {

    return this.http.get(`${this.uri}/closeCount`);
    
    }

    searchTicket(from_date, to_date) {
      return this
              .http
              .get(`${this.uri}/searchTicket/${from_date}/${to_date}`);
      }

      getUserTicket(currentUserEpf) {
        return this
                .http
                .get(`${this.uri}/searchUserTickets/${currentUserEpf}`);
        }



}
