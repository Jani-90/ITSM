import { Injectable } from '@angular/core/';
import { HttpClient } from '@angular/common/http';
//import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  //public loginSuccess: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  uri = 'http://localhost:4000/employee';

  constructor(private http: HttpClient) { }

  addEmployee(employee_no, employee_name, employee_type, designation, company, employee_branch, employee_status, username, password) {
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
    console.log(obj);
    this.http.post<{access_token:string}>(`${this.uri}/add`, obj).pipe(tap(res => { this.login(username, password )}))
        .subscribe(res => console.log('Done'));
  }

  getITEmployee() {
    
    return this.http.get(`${this.uri}`);
    
  }

  getEmpList() {
    
    return this.http.get(`${this.uri}/emp`);
    
  }

  editEmployee(id) {
    return this
            .http
            .get(`${this.uri}/edit/${id}`);
    }

  searchEmployee(search_employee_no) {
      return this
              .http
              .get(`${this.uri}/search/${search_employee_no}`);
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
  }


  /*login(username, password) {
    return this
            .http
            .get(`${this.uri}/login/${username}/${password}`);
    }*/

   /* get isLoggedIn() {
      return this.loginSuccess.asObservable();
    }*/

    login(username, password) {
      return this
              .http
              .get<{access_token: string}>(`${this.uri}/login/${username}/${password}`).pipe(tap(res => { sessionStorage.setItem('access_token', res.access_token);
            }));
      }


    updateUserRole(employee_no, user_role) {

      const obj = {

        user_role: user_role

        };
      this
        .http
        .post(`${this.uri}/updateUserRole/${employee_no}`, obj)
        .subscribe(res => console.log('Done'));
    }



}
