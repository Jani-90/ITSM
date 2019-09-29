import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DataService } from "../services/data.service";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { employee } from '../itsm';


//import { global } from '@angular/core/src/util';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  angForm: FormGroup;
  message:boolean;
  checkToken:boolean;

  //private currentUserSubject: BehaviorSubject<employee>;
  //public currentUser: Observable<employee>;

  //message: string;
  //message: string = "Hola Mundo!"

  /*@Output() messageEvent = new EventEmitter<string>();

  sendMessage(message) {
    this.messageEvent.emit(message)
  }*/
  
  constructor(private router: Router, 
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private em : EmployeeService,
              private data: DataService,
              private http : HttpClient
              ) {
    //this.currentUserSubject = new BehaviorSubject<employee>(JSON.parse(localStorage.getItem('currentUser')));
    //this.currentUser = this.currentUserSubject.asObservable();
    //console.log(this.currentUser);


    this.createForm();

   }

  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ]
      

    });


  }

  loginInfo: any = [];
  loginSuccess: any = [];
  //userSuccess:any = [];


  ngOnInit() {

      this.loginSuccess = false;
      //this.data.currentMessage.subscribe(message => this.message = message)
    }
 
    public get loggedIn(): boolean{
      return sessionStorage.getItem('access_token') !==  null;
    }



  login(username, password){
    this.route.params.subscribe(params => {
      this.em.login(username, password).subscribe(res => {
        this.loginInfo = res;
        console.log(this.loginInfo);

        if(this.loginInfo == null){
          this.loginSuccess = false;
          console.log(this.loginSuccess);
          //this.sendMessage(this.loginSuccess);
          //newMessage() {
            this.data.changeMessage(false);
         // }
         
        }
        else{
         
          this.loginSuccess = true;
          console.log(this.loginSuccess);

          this.checkToken = this.loggedIn;
          console.log(this.checkToken);


          //localStorage.setItem('currentUser', JSON.stringify(this.loginInfo));
          //this.currentUserSubject.next(this.loginInfo);
          if(this.loggedIn == true && this.checkToken == true){
            sessionStorage.setItem('currentUser', JSON.stringify(this.loginInfo));

            this.data.changeMessage(true);
            //this.currentUser = sessionStorage.getItem('currentUser');

            

            //this.currentUserSubject.next(this.loginInfo);
            //this.data.changeMessage1(this.loginInfo);
            //this.data.changeMessage1("testing");

            /*if( window.localStorage )
            {
              if( !localStorage.getItem('firstLoad') )
              {
                localStorage['firstLoad'] = true;
                window.location.reload();
              }  
             else
                localStorage.removeItem('firstLoad');
            }*/
            if( window.sessionStorage )
            {
              if( !sessionStorage.getItem('firstLoad') )
              {
                sessionStorage['firstLoad'] = true;
                window.location.reload();
              }  
             else
                sessionStorage.removeItem('firstLoad');
            }



          }
          else{
            this.data.changeMessage(false);
            //localStorage.removeItem('firstLoad');
            sessionStorage.removeItem('firstLoad');
          }
          
          //this.sendMessage(this.loginSuccess);
          //window.location.reload();
          //this.router.navigate(['/']);


        }
    
      });
    });
    }

}
