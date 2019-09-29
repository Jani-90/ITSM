import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AssetService } from '../services/asset.service';
import { BranchService } from '../services/branch.service';
import { TicketService } from '../services/ticket.service'
import { EmployeeService } from '../services/employee.service'
import { branch, ticket } from '../itsm';
import { ActivityLogService } from '../services/activityLog.service'

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

  angForm: FormGroup;

    constructor(private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ast: AssetService,
    private br: BranchService,
    private em: EmployeeService,
    private tkt: TicketService,
    private alog: ActivityLogService,) {
      this.createForm();
    }

createForm() {
  this.angForm = this.fb.group({
    asset_serial: ['', Validators.required ],
    identified_issue: ['', Validators.required ],
    criticality_rating: ['', Validators.required ],
    authorized_person: ['', Validators.required ],
    ticket_branch: ['', Validators.required ],
    ticket_no: [''],
    sender: [''],
    sender_name: [''],
    ticket_status: [''],
    tracking_status: ['']


  });


}

branches: branch[];
currentUser: any;
ticketNo: any = {};
emp: any = [];
emp1: any = [];
emp2: any = [];
created:boolean;
ticket_no: any = {};
ticket: any;
ticketNum:any; identifiedIssue:any; criticalityRating:any; 
ticketBranch:any; authorizedPerson:any;  ticketSender:any;
activity: any;


GenerateTicket(ticket_no, asset_serial, identified_issue, criticality_rating, ticket_branch, authorized_person, sender, sender_name, ticket_status, tracking_status) {
  this.tkt.GenerateTicket(ticket_no, asset_serial, identified_issue, criticality_rating, ticket_branch, authorized_person, sender, sender_name, ticket_status, tracking_status);
  this.created =true;
  this.ticketNum = ticket_no;
  this.identifiedIssue = identified_issue;
  this.criticalityRating = criticality_rating;
  this.ticketBranch = ticket_branch;
  this.authorizedPerson = authorized_person;
  this.ticketSender = sender;

  this.activity = 'New Ticket is generated for Asset Serial: '+asset_serial+' | Ticket No: '+ticket_no;
  this.alog.addActivityLog(this.activity, this.ticketSender);

  this.em.searchEmployee(authorized_person).subscribe(res => {
    this.emp1 = res;
    console.log(this.emp1);

  });

  this.em.searchEmployee(sender).subscribe(res => {
    this.emp2 = res;
    console.log(this.emp2);
    


  });
  
  //this.router.navigate(['createTicket']);
  alert('New Ticket is Generated Successfully.');
  //this.getTicketDetails(ticket_no);
  //window.location.reload();
  

}

//var ticket: any;

//ticket: String;
/*ticketDetail: any = [];
getTicketDetails(ticket_no){
  alert('test');
  console.log(ticket_no);
  this.ticket = ticket_no;
  console.log(this.ticket);
  //ticket_no = 'TN0010';
  //this.ticket = ticket_no;

  //console.log(this.ticket);
  this.route.params.subscribe(params => {
    console.log(this.ticket);
    var tic =this.ticket;
  
    this.tkt.getTicketDetails(tic).subscribe(res => {
      this.ticketDetail = res;
      console.log(this.ticketDetail);
      console.log('Testin')
 
    });
  });
}*/

ticketDetails: any = [];
getTicketDetails(ticketNum){
  alert('sucess');
  this.route.params.subscribe(params => {
    this.tkt.getTicketDetails(ticketNum).subscribe(res => {
      this.ticketDetails = res;
      console.log(this.ticketDetails);

  
    });
  });
  }


  currentEmployeeNo:any;
  currentEmployeeName: any;

ngOnInit() {
    this.created =false;

    this.currentUser = sessionStorage.getItem('currentUser');
    var user = JSON.parse(this.currentUser);
    this.currentEmployeeNo = user.employee_no;
    this.currentEmployeeName = user.employee_name;

    this.br
.getBranch()
.subscribe((data: branch[]) => {
  this.branches = data;

});



this.tkt
.getTicketNo()
.subscribe((data: ticket[]) => {
  
  this.ticketNo = data;
  
  if(this.ticketNo == null){
     new_ticket_no = 'TN0001';
  }
  else{

    var code = this.ticketNo.ticket_no;
   
    var sub1 = code.substring(0, 2);
    var sub2 = code.substring(2);
    var count = parseInt(sub2);
    var newcount = count + 1;

    if(newcount <=9)
    {		
      var new_ticket_no = 'TN000'+ newcount;
    }
    else if(newcount <=99)
    {		
      var new_ticket_no = 'TN00'+ newcount;
    }
    else if(newcount <=999)
    {		
      var new_ticket_no = 'TN0'+ newcount;
    }
    else if(newcount <=9999)
    {		
      var new_ticket_no = 'TN'+ newcount;
    }

  }


  this.angForm.get('ticket_no').setValue(new_ticket_no);
  
});





}

  assetSerial: any = [];
  showAsset(asset_serial){
    this.route.params.subscribe(params => {
      this.ast.showAsset(asset_serial).subscribe(res => {
        this.assetSerial = res;
        console.log(this.assetSerial);
  
    
      });
    });
    }




    searchEmployee(authorized_person){
      this.route.params.subscribe(params => {
        this.em.searchEmployee(authorized_person).subscribe(res => {
          this.emp = res;
          console.log(this.emp);
    
      
        });
      });
      }

}
