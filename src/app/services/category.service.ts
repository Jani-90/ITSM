import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  uri = 'http://localhost:4000/codegenerator';

  constructor(private http: HttpClient) { }

  addCategory(category_id, category_name, category_status) {
    const obj = {
        category_id: category_id,
        category_name: category_name,
        category_status: category_status
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  getCategory() {
    
    return this.http.get(`${this.uri}`);
    
  }

  editCategory(id) {
    return this
            .http
            .get(`${this.uri}/edit/${id}`);
    }

  updateCategory(category_id, category_name, category_status, id) {

    const obj = {
      category_id: category_id,
      category_name: category_name,
      category_status: category_status
      };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }


  getCategoryId(){
    return this.http.get(`${this.uri}/show`);
  }


}
