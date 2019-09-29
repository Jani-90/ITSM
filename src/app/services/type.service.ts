import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  uri = 'http://localhost:4000/codegenerator';

  constructor(private http: HttpClient) { }

  addType(type_id, type_category_name, type_name, code_pattern, configuration_type, type_status) {
    const obj = {
        type_id: type_id,
        type_category_name: type_category_name,
        type_name: type_name,
        code_pattern: code_pattern,
        configuration_type: configuration_type,
        type_status: type_status
    };
    console.log(obj);
    this.http.post(`${this.uri}/type/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  getType() {
    
    return this.http.get(`${this.uri}/type`);
    
  }

  editType(id) {
    return this
            .http
            .get(`${this.uri}/type/edit/${id}`);
    }

  updateType(type_id, type_category_name, type_name, code_pattern, configuration_type, type_status, id) {

    const obj = {
      type_id: type_id,
      type_category_name: type_category_name,
      type_name: type_name,
      code_pattern: code_pattern,
      configuration_type: configuration_type,
      type_status: type_status
      };
    this
      .http
      .post(`${this.uri}/type/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }


  getTypeId(){
    return this.http.get(`${this.uri}/type/show`);
  }

  showTypes(asset_category) {
    if(asset_category!==""){
      return this
      .http
      .get(`${this.uri}/type/showType/${asset_category}`);
    }

  }

  showAssetCode(asset_type) {
    if(asset_type!==""){
      return this
              .http
              .get(`${this.uri}/type/showAssetCode/${asset_type}`);
    }
  }
  
}
