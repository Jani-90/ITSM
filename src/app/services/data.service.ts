import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  checkToken:boolean;

  /*public get loggedIn(): boolean{
    return sessionStorage.getItem('access_token') !==  null;
  }*/

  //checkToken = this.loggedIn;
  //console.log(this.checkToken);


  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();

  //public messageSource1 = new BehaviorSubject('old');
  //currentMessage1 = this.messageSource1.asObservable();

  constructor() { }



  changeMessage(message: boolean) {
    this.messageSource.next(message);
  }


  /*public get changeMessage1():any {
    return sessionStorage.getItem('currentUser');
  }

  /*changeMessage1(message1: any) {
    console.log(message1);
    this.messageSource1.next(message1);
  }*/

  /*getCurrentUser(){
    return 
  }*/

}