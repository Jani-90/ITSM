import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  uri = 'http://localhost:4000/log';

  constructor(private http: HttpClient) { }

  addLog(log_type, log_id, log_date, log_status, log_comment ) {
    const obj = {
        log_type: log_type,
        log_id: log_id,
        log_date: log_date,
        log_status: log_status,
        log_comment: log_comment

    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }


  /*getITEmployee() {
    
    return this.http.get(`${this.uri}`);
    
  }

  editEmployee(id) {
    return this
            .http
            .get(`${this.uri}/edit/${id}`);
    }

    showAsset(asset_serial) {
        return this
                .http
                .get(`${this.uri}/search/${asset_serial}`);
        }

  updateEmployee(employee_no, employee_name, employee_type, designation, company, employee_branch, employee_status, username, password, id) {

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

  showLogID(log_type) {
    if(log_type!==""){
      return this
              .http
              .get(`${this.uri}/showLogID/${log_type}`);
    }
  }

  searchLog(log_type, from_date, to_date) {
    return this
            .http
            .get(`${this.uri}/search/${log_type}/${from_date}/${to_date}`);
    }

}
