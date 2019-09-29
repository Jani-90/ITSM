import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  uri = 'http://localhost:4000/job';

  constructor(private http: HttpClient) { }

  CreateJob(jobNo, ticket_no, inspection_comment, repairing_method, jobCreated_by, job_status) {
    const obj = {
        jobNo: jobNo,
        ticket_no: ticket_no,
        inspection_comment: inspection_comment,
        repairing_method: repairing_method,
        jobCreated_by: jobCreated_by,
        job_status: job_status,
        job_create_date: Date.now()
        

    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }


  viewJobList(ticket_no) {
    return this
            .http
            .get(`${this.uri}/view/${ticket_no}`);
    }

  viewJobListTop(ticket_no) {
    return this
            .http
            .get(`${this.uri}/viewTop/${ticket_no}`);
    }


  viewJob(id) {
    return this
            .http
            .get(`${this.uri}/viewJob/${id}`);
    }

  /*getSubmitTicket() {
    
    return this.http.get(`${this.uri}/ticketSubmitted`);
    
    }

  getReceivedTicket() {
  
    return this.http.get(`${this.uri}/ticketReceived`);
    
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
    }

    showAsset(asset_serial) {
        return this
                .http
                .get(`${this.uri}/search/${asset_serial}`);
        }*/

  UpdateJobVendor(vendor_selected, vendor_comment, job_status, id) {

    const obj = {
      vendor_selected: vendor_selected,
      vendor_comment: vendor_comment,
      job_status: job_status,
      vendor_send_date: Date.now()

      };
    this
      .http
      .post(`${this.uri}/updateJobVendor/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  UpdateJobQuotation(quotation_no, quotation_refNo, quotation_amount, quotation_date, quotation_description, quotation_attachment, job_status1, id) {

    const obj = {
      quotation_no: quotation_no,
      quotation_refNo: quotation_refNo,
      quotation_amount: quotation_amount,
      quotation_date: quotation_date,
      quotation_description: quotation_description,
      quotation_attachment: quotation_attachment,
      job_status: job_status1

      };
    this
      .http
      .post(`${this.uri}/UpdateJobQuotation/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  UpdateJobApproval(quotation_no2, quotation_approved_date, quotation_approvedBy, job_status2, id) {

    const obj = {
      quotation_approved_date: quotation_approved_date,
      quotation_approvedBy: quotation_approvedBy,
      job_status: job_status2

      };
    this
      .http
      .post(`${this.uri}/updateJobApproval/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  UpdateJobPayment(quotation_no3, bill_no, payment_amount, payment_date, payment_description, payment_attachment, job_status3, id) {

    const obj = {
      bill_no: bill_no,
      payment_amount: payment_amount,
      payment_date: payment_date,
      payment_description: payment_description,
      payment_attachment: payment_attachment,
      job_status: job_status3

      };
    this
      .http
      .post(`${this.uri}/UpdateJobPayment/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  UpdateJobVendorReceived(vendor_receive_date, vendor_rating, vendor_receive_comment, job_status4, id) {

    const obj = {
      vendor_receive_date: vendor_receive_date,
      vendor_rating: vendor_rating,
      vendor_receive_comment: vendor_receive_comment,
      job_status: job_status4

      };
    this
      .http
      .post(`${this.uri}/UpdateJobVendorReceived/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  
  UpdateJobInhouseClose(inhouse_closing_comment, job_status4, id) {

    const obj = {
      inhouse_closing_comment: inhouse_closing_comment,
      job_status: job_status4

      };
    this
      .http
      .post(`${this.uri}/UpdateJobInhouseClose/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  getJobNoteNo(){
    return this.http.get(`${this.uri}/show`);
  }

  getNextQuotationNo(){
    return this.http.get(`${this.uri}/showQuotationNo`);
  }

  getNotInCondition() {

    return this.http.get(`${this.uri}/jobsNIC`);
    
    }



}
