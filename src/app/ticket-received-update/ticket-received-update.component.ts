import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { TicketReceivedService } from '../services/ticketReceived.service';
import { EmployeeService } from '../services/employee.service'
import { AssetService } from '../services/asset.service';
import { JobService } from '../services/job.service';
import { ticket, job } from '../itsm';

@Component({
  selector: 'app-ticket-received-update',
  templateUrl: './ticket-received-update.component.html',
  styleUrls: ['./ticket-received-update.component.css']
})

export class TicketReceivedUpdateComponent implements OnInit {

  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private fb: FormBuilder,
    private em: EmployeeService,
    private ast: AssetService,
    private job: JobService,
    private ticRec : TicketReceivedService) {
      this.createForm();
     }


     createForm() {
      this.angForm = this.fb.group({
        inspection_comment: ['', Validators.required ],
        repairing_method: ['', Validators.required ],
        ticket_no: [''],
        jobCreated_by: [''],
        jobNo: [''],
        ticket_status: [''],
        tracking_status: [''],
        job_status: ['']
        
  
      });
  
    }

    RecTicket: any =[];
    emp1: any = [];
    emp2: any = [];
    emp3: any = [];
    asset: any = [];

    currentEmployeeNo:any;
    currentUser: any;
    buttonEnabled: boolean;

    JobNotes: any = {};

    ticketNo:any; sendingBranch:any; criticalityRating: any; ticketSender:any; ticketAuthorizedBy:any;
    ticketCreateDate: any; ticketStatus:any; identifiedIssue:any; assetSerial:any; ticketCreateDate1:any;
    ticketReceivedDate: any; ticketReceivedDate1: any; receivedBy: any;

    btnStatus1:boolean;
    btnStatus2:boolean;

  ngOnInit() {

    this.btnStatus1 = true;
    this.btnStatus2 = false;

    this.currentUser = sessionStorage.getItem('currentUser');
    var user = JSON.parse(this.currentUser);
    this.currentEmployeeNo = user.employee_no;

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

        if(this.ticketStatus=='IT_Received' || this.ticketStatus=='Close_Job'){
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


  this.job
  .getJobNoteNo()
  .subscribe((data: job[]) => {
    console.log(data);
    this.JobNotes = data;
    //console.log(this.makeCodes.make_id);
    
    if(this.JobNotes == null){
      new_job_no = 'JN0001';
    }
    else{

      var code = this.JobNotes.jobNo;
      //console.log(code);

      var sub1 = code.substring(0, 2);
      var sub2 = code.substring(2);
      var count = parseInt(sub2);
      var newcount = count + 1;

      if(newcount <=9)
      {		
        var new_job_no = 'JN000'+ newcount;
      }
      else if(newcount <=99)
      {		
        var new_job_no = 'JN00'+ newcount;
      }
      else if(newcount <=999)
      {		
        var new_job_no = 'JN0'+ newcount;
      }

    }


    this.angForm.get('jobNo').setValue(new_job_no);
    
});

  }



  CreateJob(jobNo, ticket_no, inspection_comment, repairing_method, jobCreated_by, job_status) {
    this.job.CreateJob(jobNo, ticket_no, inspection_comment, repairing_method, jobCreated_by, job_status );
    alert('New Job is added Successfully.');
    window.location.reload();
    this.router.navigate(['ticketReceived']);
  }

  UpdateTicket(ticket_no, ticket_status, tracking_status) {
    this.route.params.subscribe(params => {
       this.ticRec.UpdateTicket(ticket_no, ticket_status, tracking_status, params['id']);
       //alert('Ticket Received Successfully');
       window.location.reload();
       this.router.navigate(['ticketSubmitted']);
       
       
 });
}


showFields(repairing_method){  

  this.route.params.subscribe(params => {
    if(repairing_method=="Inhouse"){
      this.btnStatus1 = true;
      this.btnStatus2 = false;
      this.angForm.get('ticket_status').setValue('Open_Job_Inhouse');
      this.angForm.get('job_status').setValue('Open_Job_Inhouse');
      this.angForm.get('tracking_status').setValue('Opened');
    }
    else if(repairing_method=="Vendor"){
      this.btnStatus1 = true;
      this.btnStatus2 = false;
      this.angForm.get('ticket_status').setValue('Open_Job_Vendor');
      this.angForm.get('job_status').setValue('Open_Job_Vendor');
      this.angForm.get('tracking_status').setValue('Opened');
    }
    else if(repairing_method=="Not In Condition"){
      this.btnStatus1 = false;
      this.btnStatus2 = true;
      this.angForm.get('ticket_status').setValue('Not_In_Condition');
      this.angForm.get('job_status').setValue('Not_In_Condition');
      this.angForm.get('tracking_status').setValue('Not_In_Condition');
      
    }
    else{
      this.btnStatus1 = false;
      this.btnStatus2 = false;
      this.angForm.get('ticket_status').setValue('');
      this.angForm.get('job_status').setValue('');
      this.angForm.get('tracking_status').setValue('');
    }

  });
  
}



}
