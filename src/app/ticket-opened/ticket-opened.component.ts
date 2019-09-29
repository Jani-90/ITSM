import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { TicketService } from '../services/ticket.service';
import { EmployeeService } from '../services/employee.service'
import { ticket } from '../itsm';

@Component({
  selector: 'app-ticket-opened',
  templateUrl: './ticket-opened.component.html',
  styleUrls: ['./ticket-opened.component.css']
})
export class TicketOpenedComponent implements OnInit {

  constructor(private router: Router,
    private tkt: TicketService,
    private em: EmployeeService) { }

openTickets: ticket[];
sender_epf: any = [];
receiver_epf: any = [];
emp3: any = [];
emp4: any = [];
empName1: any = [];
empSender:any;
empReceiver:any;


  ngOnInit() {

    this.tkt
    .getOpenedTicket()
    .subscribe((data: ticket[]) => {
      this.openTickets = data;

      console.log(this.openTickets);
      console.log(this.openTickets.length);

      for (var i=0; i<this.openTickets.length; i++) {
        var opened = this.openTickets[i];
        this.sender_epf[i] = opened.sender;
        this.receiver_epf[i] = opened.received_by;

        this.em.searchEmployee(this.sender_epf[i]).subscribe(res => {

          this.emp3[i] = res;
          var emp = this.emp3[i];
          console.log(emp);
          this.empSender = emp.employee_name;
          console.log(this.empSender);

      
        });

        this.em.searchEmployee(this.receiver_epf[i]).subscribe(res => {

          this.emp4[i] = res;
          var empp = this.emp4[i];
          console.log(empp);
          this.empReceiver = empp.employee_name;
          console.log(this.empReceiver);

      
        });



      }


  });


  }

}
