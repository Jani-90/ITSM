import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  uri = 'http://localhost:4000/location';

  constructor(private http: HttpClient) { }

  addBranch(branch_id, branch_name, branch_code, branch_status) {
    const obj = {
        branch_id: branch_id,
        branch_name: branch_name,
        branch_code: branch_code,
        branch_status: branch_status
    };
    console.log(obj);
    this.http.post(`${this.uri}/branch/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  getBranch() {
    
    return this.http.get(`${this.uri}/branch`);
    
  }

  editBranch(id) {
    return this
            .http
            .get(`${this.uri}/branch/edit/${id}`);
    }

    updateBranch(branch_id, branch_name, branch_code, branch_status, id) {

    const obj = {
        branch_id: branch_id,
        branch_name: branch_name,
        branch_code: branch_code,
        branch_status: branch_status
      };
    this
      .http
      .post(`${this.uri}/branch/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }


  getBranchId(){
    return this.http.get(`${this.uri}/branch/show`);
  }
  
}
