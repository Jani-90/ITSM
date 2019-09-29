import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { TicketSubmittedService } from '../services/ticketSubmitted.service';
import { EmployeeService } from '../services/employee.service'
import { AssetService } from '../services/asset.service';
import { ticket } from '../itsm';

@Component({
  selector: 'app-ticket-submitted-update',
  templateUrl: './ticket-submitted-update.component.html',
  styleUrls: ['./ticket-submitted-update.component.css']
})
export class TicketSubmittedUpdateComponent implements OnInit {

  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private fb: FormBuilder,
    private em: EmployeeService,
    private ast: AssetService,
    private ticSub : TicketSubmittedService) {
      this.createForm();
     }

     createForm() {
      this.angForm = this.fb.group({
        ticket_no: [''],
        received_by: [''],
        received_by_name: [''],
        ticket_status: ['']
        
  
      });
  
    }


    SubTicket: any =[];
    emp1: any = [];
    emp2: any = [];
    asset: any = [];

    currentEmployeeNo:any;
    currentUser: any;
    buttonEnabled: boolean;
    currentEmployeeName:any;

    ticketNo:any; sendingBranch:any; criticalityRating: any; ticketSender:any; ticketAuthorizedBy:any;
    ticketCreateDate: any; ticketStatus:any; identifiedIssue:any; assetSerial:any; ticketCreateDate1:any;

  ngOnInit() {

    this.currentUser = sessionStorage.getItem('currentUser');
    var user = JSON.parse(this.currentUser);
    this.currentEmployeeNo = user.employee_no;
    this.currentEmployeeName = user.employee_name;

    this.route.params.subscribe(params => {
      this.ticSub.viewSubmitTicket(params['id']).subscribe(res => {
        this.SubTicket = res;
        var submitTicket = this.SubTicket;
        this.ticketNo = submitTicket.ticket_no;
        this.sendingBranch = submitTicket.ticket_branch;
        this.criticalityRating = submitTicket.criticality_rating;
        this.ticketSender = submitTicket.sender;
        this.ticketAuthorizedBy = submitTicket.authorized_person;
        this.ticketCreateDate = submitTicket.ticket_create_date;
        this.ticketStatus = submitTicket.ticket_status;
        this.identifiedIssue = submitTicket.identified_issue;
        this.assetSerial = submitTicket.asset_serial;

        if(this.ticketStatus=='IT_Submitted'){
          this.buttonEnabled = true;
        }
        else{
          this.buttonEnabled = false;
        }

        this.ticketCreateDate1 = this.ticketCreateDate.substring(0, 10);

        this.em.searchEmployee(this.ticketAuthorizedBy).subscribe(res => {
          this.emp1 = res;
          console.log(this.emp1);
      
        });

        this.em.searchEmployee(this.ticketSender).subscribe(res => {
          this.emp2 = res;
          console.log(this.emp2);
      
        });

        this.ast.showAsset(this.assetSerial).subscribe(res => {
          this.asset = res;
          console.log(this.asset);
      
        });

    });
  });


  }

  ReceiveTicket(ticket_no, received_by, received_by_name, ticket_status, tracking_status) {
    this.route.params.subscribe(params => {
       this.ticSub.ReceiveTicket(ticket_no, received_by, received_by_name, ticket_status, tracking_status, params['id']);
       alert('Ticket Received Successfully');
       window.location.reload();
       this.router.navigate(['ticketSubmitted']);
       
       
 });
}



}
