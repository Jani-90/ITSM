import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { TicketService } from '../services/ticket.service';
import { EmployeeService } from '../services/employee.service'
import { TicketSubmittedService } from '../services/ticketSubmitted.service'
import { ticket } from '../itsm';

@Component({
  selector: 'app-ticket-submitted',
  templateUrl: './ticket-submitted.component.html',
  styleUrls: ['./ticket-submitted.component.css']
})
export class TicketSubmittedComponent implements OnInit {

  constructor(private router: Router,
                private tkt: TicketService,
                private em: EmployeeService) { }


  submitTickets: ticket[];
  sender_epf: any = [];
  emp3: any = [];
  empName1: any = [];
  employee:any;

  ngOnInit() {

    this.tkt
    .getSubmitTicket()
    .subscribe((data: ticket[]) => {
      this.submitTickets = data;
      console.log(this.submitTickets);
      console.log(this.submitTickets.length);

      for (var i=0; i<this.submitTickets.length; i++) {
        var submitted = this.submitTickets[i];
        this.sender_epf[i] = submitted.sender;

        this.em.searchEmployee(this.sender_epf[i]).subscribe(res => {

          this.emp3[i] = res;
          var emp = this.emp3[i];
          console.log(emp);
          this.employee = emp.employee_name;
          console.log(this.employee);
          //this.empName[i] = this.emp3[i].employee_name;
          //console.log(this.emp3[i]);


          
          //console.log(this.empName[i]);
      
        });
      }
      //submitTickets.sender;
      //var sender_epf = submitted
      /*this.em.searchEmployee(authorized_person).subscribe(res => {
        this.emp1 = res;
        console.log(this.emp1);
    
      });*/

  });


  }

  createDate:any;
  display(create_date){
    //alert(create_date);
    this.createDate = create_date.substring(0, 10);
    return this.createDate;
  }

}
