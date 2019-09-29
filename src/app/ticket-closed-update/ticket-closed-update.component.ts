import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { TicketReceivedService } from '../services/ticketReceived.service';
import { EmployeeService } from '../services/employee.service'
import { AssetService } from '../services/asset.service';
import { TicketService } from '../services/ticket.service';
import { ActivityLogService } from '../services/activityLog.service'


@Component({
  selector: 'app-ticket-closed-update',
  templateUrl: './ticket-closed-update.component.html',
  styleUrls: ['./ticket-closed-update.component.css']
})


export class TicketClosedUpdateComponent implements OnInit {

  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private ticRec : TicketReceivedService,
    private em: EmployeeService,
    private ast: AssetService,
    private alog: ActivityLogService,
    private tic: TicketService) {
      this.createForm();
     }

     createForm() {
      this.angForm = this.fb.group({
        ticket_closing_comment: ['', Validators.required ],
        ticket_no: [''],
        ticket_status: [''],
        tracking_status: ['']       
  
      });
  
    }

    

    RecTicket: any =[];
    emp1: any = [];
    emp2: any = [];
    emp3: any = [];
    asset: any = [];
    buttonEnabled: boolean;

    
    ticketNo:any; sendingBranch:any; criticalityRating: any; ticketSender:any; ticketAuthorizedBy:any;
    ticketCreateDate: any; ticketStatus:any; identifiedIssue:any; assetSerial:any; ticketCreateDate1:any;
    ticketReceivedDate: any; ticketReceivedDate1: any; receivedBy: any;


  ngOnInit() {

    this.route.params.subscribe(params => {
      this.ticRec.viewReceivedTicket(params['id']).subscribe(res => {
        this.RecTicket = res;
        var receiveTicket = this.RecTicket;
        this.ticketNo = receiveTicket.ticket_no;
        this.sendingBranch = receiveTicket.ticket_branch;
        this.criticalityRating = receiveTicket.criticality_rating;
        this.ticketSender = receiveTicket.sender;
        this.ticketAuthorizedBy = receiveTicket.authorized_person;
        this.ticketCreateDate = receiveTicket.ticket_create_date;
        this.ticketStatus = receiveTicket.ticket_status;
        this.identifiedIssue = receiveTicket.identified_issue;
        this.assetSerial = receiveTicket.asset_serial;
        this.ticketReceivedDate = receiveTicket.ticket_received_date;
        this.receivedBy = receiveTicket.received_by;

        if(this.ticketStatus=='Close_Job'){
          this.buttonEnabled = true;
        }
        else{
          this.buttonEnabled = false;
        }

        this.ticketCreateDate1 = this.ticketCreateDate.substring(0, 10);
        this.ticketReceivedDate1 = this.ticketReceivedDate.substring(0, 10);

        this.em.searchEmployee(this.ticketAuthorizedBy).subscribe(res => {
          this.emp1 = res;
          console.log(this.emp1);
      
        });

        this.em.searchEmployee(this.ticketSender).subscribe(res => {
          this.emp2 = res;
          console.log(this.emp2);
      
        });

        this.em.searchEmployee(this.receivedBy).subscribe(res => {
          this.emp3 = res;
          console.log(this.emp3);
      
        });

        this.ast.showAsset(this.assetSerial).subscribe(res => {
          this.asset = res;
          console.log(this.asset);
      
        });

    });
  });



  }

  currentUser: any;
  currentEmployeeNo: any;
  activity: any;

  CloseTicket(ticket_closing_comment, ticket_no, ticket_status, tracking_status) {
    this.route.params.subscribe(params => {
       this.tic.CloseTicket(ticket_closing_comment,ticket_no, ticket_status, tracking_status);

       this.activity = 'Ticket is Closed and Asset is dispatched to branch | Ticket No: '+ticket_no;
       this.currentUser = sessionStorage.getItem('currentUser');
       var user = JSON.parse(this.currentUser);
       this.currentEmployeeNo = user.employee_no;

       this.alog.addActivityLog(this.activity, this.currentEmployeeNo);

       alert('Ticket is Closed Successfully');
       window.location.reload();
       this.router.navigate(['']);
       
       
 });
}

}
