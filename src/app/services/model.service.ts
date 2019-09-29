import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  uri = 'http://localhost:4000/makemodel';

  constructor(private http: HttpClient) { }

  addModel(model_id, model_make_name, model_name, model_status) {
    const obj = {
        model_id: model_id,
        model_make_name: model_make_name,
        model_name: model_name,
        model_status: model_status
    };
    console.log(obj);
    this.http.post(`${this.uri}/model/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  getModel() {
    
    return this.http.get(`${this.uri}/model`);
    
  }

  editModel(id) {
    return this
            .http
            .get(`${this.uri}/model/edit/${id}`);
    }

  updateModel(model_id, model_make_name, model_name, model_status, id) {

    const obj = {
      model_id: model_id,
      model_make_name: model_make_name,
      model_name: model_name,
      model_status: model_status
      };
    this
      .http
      .post(`${this.uri}/model/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }


  getModelCode(){
    return this.http.get(`${this.uri}/model/show`);
  }

  showModels(asset_make) {
    return this
            .http
            .get(`${this.uri}/model/showModel/${asset_make}`);
    }
  
}
