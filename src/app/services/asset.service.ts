import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  uri = 'http://localhost:4000/assetRegistration';

  constructor(private http: HttpClient) { }

 addAsset(asset_category, asset_type, asset_code, asset_make, asset_model, asset_serial, asset_barcode, asset_name, asset_classification, asset_location, asset_owner_IT, asset_branch, asset_owner_branch,  asset_company, processor, RAM, hard_disk, display, os, installed_sw, description, asset_status, purchased_date, warranty_period) {
    const obj = {
        asset_category: asset_category,
        asset_type: asset_type,
        asset_code: asset_code,
        asset_make: asset_make,
        asset_model: asset_model,
        asset_serial: asset_serial,
        asset_barcode: asset_barcode,
        asset_name: asset_name,
        asset_classification: asset_classification,
        asset_location: asset_location,
        asset_owner_IT: asset_owner_IT,
        asset_branch: asset_branch,
        asset_owner_branch: asset_owner_branch,
        asset_company: asset_company,
        processor: processor,
        RAM: RAM,
        hard_disk: hard_disk,
        display: display,
        os: os,
        installed_sw: installed_sw,
        description: description,
        asset_status: asset_status,
        purchased_date: purchased_date,
        warranty_period: warranty_period
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }


  getITEmployee() {
    
    return this.http.get(`${this.uri}`);
    
  }

  editEmployee(id) {
    return this
            .http
            .get(`${this.uri}/edit/${id}`);
    }

    editAsset(id) {
      return this
              .http
              .get(`${this.uri}/editAsset/${id}`);
      }
  

    showAsset(asset_serial) {
        return this
                .http
                .get(`${this.uri}/search/${asset_serial}`);
        }

    showAsset1(asset_code) {
      asset_code = encodeURIComponent(asset_code);
      return this
              .http
              .get(`${this.uri}/search1/${asset_code}`);
      }

    showAsset2(asset_barcode) {
      return this
              .http
              .get(`${this.uri}/search2/${asset_barcode}`);
      }

  /*updateEmployee(employee_no, employee_name, employee_type, designation, company, employee_branch, employee_status, username, password, id) {

    const obj = {
      employee_no: employee_no,
      employee_name: employee_name,
      employee_type: employee_type,
      designation: designation,
      company: company,
      employee_branch: employee_branch,
      employee_status: employee_status,
      username: username,
      password: password
      };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }*/

  UpdateAsset(asset_category, asset_type, asset_code, asset_make, asset_model, asset_serial, asset_barcode, asset_name, asset_classification, asset_location, asset_owner_IT, asset_branch, asset_owner_branch,  asset_company, processor, RAM, hard_disk, display, os, installed_sw, description, asset_status, purchased_date, warranty_period, id) {

    const obj = {
      asset_make: asset_make,
      asset_model: asset_model,
      asset_name: asset_name,
      asset_classification: asset_classification,
      asset_location: asset_location,
      asset_owner_IT: asset_owner_IT,
      asset_branch: asset_branch,
      asset_owner_branch: asset_owner_branch,
      asset_company: asset_company,
      processor: processor,
      RAM: RAM,
      hard_disk: hard_disk,
      display: display,
      os: os,
      installed_sw: installed_sw,
      description: description,
      asset_status: asset_status,
      purchased_date: purchased_date,
      warranty_period: warranty_period

      };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  showAssetCode1(asset_type) {
    if(asset_type!==""){
      return this
              .http
              .get(`${this.uri}/showAssetCode1/${asset_type}`);
    }
  }

  searchAsset(asset_category, asset_type) {
    if(asset_category!=="" && asset_type!==""){
      return this
              .http
              .get(`${this.uri}/searchAsset/${asset_category}/${asset_type}`);
    }
  }

  CheckSerialValidity(asset_serial) {
    if(asset_serial!==""){
      return this
              .http
              .get(`${this.uri}/CheckSerialValidity/${asset_serial}`);
    }
  }

  CheckSerialValidity1(asset_barcode) {
    if(asset_barcode!==""){
      return this
              .http
              .get(`${this.uri}/CheckSerialValidity1/${asset_barcode}`);
    }
  }



}
