import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MakeService {

  uri = 'http://localhost:4000/makemodel';

  constructor(private http: HttpClient) { }

  addMake(make_id, make_name, make_status) {
    const obj = {
      make_id: make_id,
      make_name: make_name,
      make_status: make_status
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  getMake() {
    
    return this.http.get(`${this.uri}`);
    
  }

  editMake(id) {
    return this
            .http
            .get(`${this.uri}/edit/${id}`);
    }

  updateMake(make_id, make_name, make_status, id) {

    const obj = {
      make_id: make_id,
      make_name: make_name,
      make_status: make_status
      };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }


  getMakeCode(){
    return this.http.get(`${this.uri}/show`);
  }


}
