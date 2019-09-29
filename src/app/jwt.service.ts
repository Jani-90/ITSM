import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
//import { login } from 'src/app/login/login.component'

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(private httpClient: HttpClient) { }
}

/*login(username:string, password:string) {
  return this.httpClient.post<{access_token:  string}>('http://localhost:4200/login', {username, password}).pipe(tap(res => {
  localStorage.setItem('access_token', res.access_token);
}))
}*/