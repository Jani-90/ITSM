import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { TicketService } from '../services/ticket.service'

@Component({
  selector: 'app-ticket-report',
  templateUrl: './ticket-report.component.html',
  styleUrls: ['./ticket-report.component.css']
})
export class TicketReportComponent implements OnInit {

  angForm: FormGroup;

    constructor(private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tkt: TicketService) {
      this.createForm();
    }

createForm() {
  this.angForm = this.fb.group({
    from_date: ['', Validators.required ],
    to_date: ['', Validators.required ]


  });



}

  tickets: any = [];

  ngOnInit() {

  }

  searchTicket(from_date, to_date){
    this.route.params.subscribe(params => {
      this.tkt.searchTicket(from_date, to_date).subscribe(res => {
        this.tickets = res;
        console.log(this.tickets);
  
    
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
