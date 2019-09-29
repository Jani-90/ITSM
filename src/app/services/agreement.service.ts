import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgreementService {

  uri = 'http://localhost:4000/agreement';

  constructor(private http: HttpClient) { }

  addAgreement(agreement_no, vendor, agreement_name, agreement_type, agreement_category, start_date, end_date, renewal_period, agreement_status) {
    const obj = {
      agreement_no: agreement_no,
      vendor: vendor,
      agreement_name: agreement_name,
      agreement_type: agreement_type,
      agreement_category: agreement_category,
      start_date: start_date,
      end_date: end_date,
      renewal_period: renewal_period,
      agreement_status: agreement_status

    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  getAgreement() {
    
    return this.http.get(`${this.uri}`);
    
  }

  editAgreement(id) {
  return this
          .http
          .get(`${this.uri}/edit/${id}`);
  }

  UpdateAgreement(vendor_rating, agreement_comment, agreement_status, id) {

    const obj = {
        vendor_rating: vendor_rating,
        agreement_comment: agreement_comment,
        agreement_status: agreement_status
      };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }


  getAgreementNo(){
    return this.http.get(`${this.uri}/show`);
  }


}
