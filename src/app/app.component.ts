import { Component,  OnInit } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';

import { EmployeeService } from '../app/services/employee.service';
import { DataService } from "../app/services/data.service";
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'itsm';
  constructor(private data: DataService,
    private router: Router) {}
  /*constructor(private _loadingBar: SlimLoadingBarService, 
      private _router: Router,
      private em : EmployeeService,
      private data: DataService) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }*/

  message:boolean;
  message1:any;
  checkToken:boolean;
  currentUser:any = [];
  currentUserName:any;
  currentUserRole:any;
  datetime:any;

  menu_branchUser:boolean;
  menu_supervisor:boolean;
  menu_ITOfficer:boolean;
  menu_administrator:boolean;

  //userSuccess:boolean;
  

  public get loggedIn(): boolean{
    return sessionStorage.getItem('access_token') !==  null;
  }

  /*public get userIn(): boolean{
    return sessionStorage.getItem('currentUser') !==  null;
  }*/



  userSuccess:boolean =true;



  ngOnInit() {

    this.checkToken = this.loggedIn;
    console.log(this.checkToken);


    

    if(this.checkToken == false){
      this.data.currentMessage.subscribe(message => this.message = message)
    }
    else{
      
      /*if (sessionStorage.getItem('currentUser')) {
        return (JSON.parse(sessionStorage.getItem('currentUser')));
    }*/

      
      this.currentUser = sessionStorage.getItem('currentUser');

      this.message = true;

      //this.data.changeMessage1.subscribe(currentUser => this.currentUser = currentUser);

      //console.log(this.currentUser);
      var user = JSON.parse(this.currentUser);
      //console.log(user.employee_name);
      this.currentUserName = user.employee_name;
      this.currentUserRole = user.user_role;
      //console.log(this.currentUserRole);

      if(this.currentUserRole=='Branch User'){
        this.menu_branchUser = true;
      }
      else if(this.currentUserRole=='Supervisor'){
        this.menu_supervisor = true;
      }
      else if(this.currentUserRole=='IT Officer'){
        this.menu_ITOfficer = true;
      }
      else if(this.currentUserRole=='Administrator'){
        this.menu_administrator = true;
      }
      else{
        this.menu_branchUser = false;
        this.menu_supervisor = false;
        this.menu_ITOfficer = false;
        this.menu_administrator = false;
      }

      let now = new Date();

      let options = {  
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
      };
  
      var today = now.toLocaleString('en-us', options);
      console.log(today);
      this.datetime = today;
      
      
      



      /*this.data
      .getCurrentUser().subscribe(message1 => this.message1 = message1)*/


      /*.subscribe((data: location[]) => {
        this.locations = data;
        console.log(this.locations);*/

        //window.location.reload();
        //stop;
     

        


    }

    
    //console.log(this.message);


  }
 

  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('firstLoad');
    window.location.reload();

  }

  LoadScreen(){
    alert('dggh');
    //this.router.navigate(['superviserDashboard']);
  }

  /*getCurrentUser(){
    window.alert('gdgsdj');
    this.currentUser = sessionStorage.getItem('currentUser');
    console.log(this.currentUser);
    var user = JSON.parse(this.currentUser);
    console.log(user.employee_name);
    this.currentUserName = user.employee_name;
    return this.currentUserName;
  }

  //isLoggedIn$: Observable<boolean>;
  //ngOnInit() {
    //this.isLoggedIn$ = this.em.loginSuccess;
  //}

  //message:string = "false";

  
  /*receiveMessage($event) {
    this.message = $event
  }*/

}
