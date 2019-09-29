import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { LogService } from '../services/log.service'

@Component({
  selector: 'app-log-detail',
  templateUrl: './log-detail.component.html',
  styleUrls: ['./log-detail.component.css']
})
export class LogDetailComponent implements OnInit {

  angForm: FormGroup;

    constructor(private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private log: LogService) {
      this.createForm();
    }

createForm() {
  this.angForm = this.fb.group({
    log_type: ['', Validators.required ],
    from_date: ['', Validators.required ],
    to_date: ['', Validators.required ],


  });



}

  ngOnInit() {
  }


  logs: any = [];

  searchLog(log_type, from_date, to_date){
    this.route.params.subscribe(params => {
      this.log.searchLog(log_type, from_date, to_date).subscribe(res => {
        this.logs = res;
        console.log(this.logs);
  
    
      });
    });
    }


  createDate:any;
  display(create_date){
    //alert(create_date);
    this.createDate = create_date.substring(0, 10);
    return this.createDate;
  }




}
