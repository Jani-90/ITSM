import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../services/ticket.service';
import { EmployeeService } from '../services/employee.service'
import { ticket } from '../itsm';

@Component({
  selector: 'app-ticket-closed',
  templateUrl: './ticket-closed.component.html',
  styleUrls: ['./ticket-closed.component.css']
})
export class TicketClosedComponent implements OnInit {

  constructor(private router: Router,
    private tkt: TicketService,
    private em: EmployeeService) { }

    closeTickets: ticket[];
    sender_epf: any = [];
    receiver_epf: any = [];
    emp3: any = [];
    emp4: any = [];
    empName1: any = [];
    empSender:any;
    empReceiver:any;


  ngOnInit() {

    this.tkt
    .getClosedTicket()
    .subscribe((data: ticket[]) => {
      this.closeTickets = data;

      console.log(this.closeTickets);
      console.log(this.closeTickets.length);

      for (var i=0; i<this.closeTickets.length; i++) {
        var closed = this.closeTickets[i];
        this.sender_epf[i] = closed.sender;
        this.receiver_epf[i] = closed.received_by;

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

  createDate:any;
  display(create_date){
    //alert(create_date);
    this.createDate = create_date.substring(0, 10);
    return this.createDate;
  }

}
