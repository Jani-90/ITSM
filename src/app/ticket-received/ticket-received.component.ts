import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { TicketService } from '../services/ticket.service';
import { EmployeeService } from '../services/employee.service'
import { ticket } from '../itsm';

@Component({
  selector: 'app-ticket-received',
  templateUrl: './ticket-received.component.html',
  styleUrls: ['./ticket-received.component.css']
})
export class TicketReceivedComponent implements OnInit {

  constructor(private router: Router,
    private tkt: TicketService,
    private em: EmployeeService) { }

    receiveTickets: ticket[];
    sender_epf: any = [];
    receiver_epf: any = [];
    emp3: any = [];
    emp4: any = [];
    empName1: any = [];
    empSender:any;
    empReceiver:any;



  ngOnInit() {

    this.tkt
    .getReceivedTicket()
    .subscribe((data: ticket[]) => {
      this.receiveTickets = data;
      console.log(this.receiveTickets);
      console.log(this.receiveTickets.length);

      for (var i=0; i<this.receiveTickets.length; i++) {
        var received = this.receiveTickets[i];
        this.sender_epf[i] = received.sender;
        this.receiver_epf[i] = received.received_by;

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
