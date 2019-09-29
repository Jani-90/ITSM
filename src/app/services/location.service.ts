import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  uri = 'http://localhost:4000/location';

  constructor(private http: HttpClient) { }

  addLocation(location_code, location_name, location_status) {
    const obj = {
        location_code: location_code,
        location_name: location_name,
        location_status: location_status
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

    getLocation() {
    
    return this.http.get(`${this.uri}`);
    
    }

    editLocation(id) {
    return this
            .http
            .get(`${this.uri}/edit/${id}`);
    }

    updateLocation(location_code, location_name, location_status, id) {

    const obj = {
        location_code: location_code,
        location_name: location_name,
        location_status: location_status
      };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }


  getLocationCode(){
    return this.http.get(`${this.uri}/show`);
  }


}
