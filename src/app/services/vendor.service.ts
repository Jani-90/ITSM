import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  uri = 'http://localhost:4000/vendor';

  constructor(private http: HttpClient) { }

  addVendor(vendor_code, vendor_name, vendor_address, vendor_contact_no1, vendor_contact_no2, vendor_email, contact_person, telephone_no, mobile_no, email, vendor_status ) {
    const obj = {
        vendor_code: vendor_code,
        vendor_name: vendor_name,
        vendor_address: vendor_address,
        vendor_contact_no1: vendor_contact_no1,
        vendor_contact_no2: vendor_contact_no2,
        vendor_email: vendor_email,
        contact_person: contact_person,
        telephone_no: telephone_no,
        mobile_no: mobile_no,
        email: email,
        vendor_status: vendor_status
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

    getVendor() {
    
    return this.http.get(`${this.uri}`);
    
    }

    editVendor(id) {
      return this
              .http
              .get(`${this.uri}/edit/${id}`);
      }

    updateVendor(vendor_code, vendor_name, vendor_address, vendor_contact_no1, vendor_contact_no2, vendor_email, contact_person, telephone_no, mobile_no, email, vendor_status, id) {

    const obj = {
      vendor_code: vendor_code,
      vendor_name: vendor_name,
      vendor_address: vendor_address,
      vendor_contact_no1: vendor_contact_no1,
      vendor_contact_no2: vendor_contact_no2,
      vendor_email: vendor_email,
      contact_person: contact_person,
      telephone_no: telephone_no,
      mobile_no: mobile_no,
      email: email,
      vendor_status: vendor_status

      };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }


  getVendorCode(){
    return this.http.get(`${this.uri}/show`);
  }


}
