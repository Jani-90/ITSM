import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { JobService } from '../services/job.service';
import { TicketService } from '../services/ticket.service';
import { VendorService } from '../services/vendor.service';
import { EmployeeService } from '../services/employee.service'
import { vendor, job } from '../itsm';
//import { MdRadioModule } from '@angular/material';

@Component({
  selector: 'app-job-process',
  templateUrl: './job-process.component.html',
  styleUrls: ['./job-process.component.css']
})
export class JobProcessComponent implements OnInit {

  angForm: FormGroup;
  angForm1: FormGroup;
  angForm2: FormGroup;
  angForm3: FormGroup;
  angForm4: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private fb: FormBuilder,
    private job: JobService,
    private tkt: TicketService,
    private em: EmployeeService,
    private vd: VendorService) { 
      this.createForm();
    }


    createForm() {
      this.angForm = this.fb.group({
        vendor_selected: ['', Validators.required ],
        vendor_comment: ['', Validators.required ],
        ticket_status: [''],
        job_status: [''],
        ticket_no: ['']
        
  
      });

      this.angForm1 = this.fb.group({
        quotation_amount: ['', Validators.required ],
        quotation_date: ['', Validators.required ],
        quotation_no: [''],
        quotation_refNo: [''],
        quotation_description: [''],
        quotation_attachment: [''],
        ticket_status1: [''],
        job_status1: [''],
        ticket_no1: ['']
  
      });


      this.angForm2 = this.fb.group({
        quotation_approved_date: ['', Validators.required ],
        quotation_approvedBy: ['', Validators.required ],
        quotation_no2: [''],
        ticket_status2: [''],
        job_status2:[''],
        ticket_no2: ['']
        
  
      });

      this.angForm3 = this.fb.group({
        bill_no: ['', Validators.required ],
        payment_amount: ['', Validators.required ],
        payment_date: ['', Validators.required ],
        quotation_no3: [''],
        payment_description: [''],
        payment_attachment: [''],
        ticket_status3: [''],
        job_status3:[''],
        ticket_no3: ['']
        
  
      });

      this.angForm4 = this.fb.group({
        vendor_receive_date: ['', Validators.required ],
        vendor_receive_comment: ['', Validators.required ],
        vendor_rating: [''],
        ticket_status4: [''],
        job_status4:[''],
        ticket_no4: ['']
        
  
      });
  
    }

JobDetails: any = [];
vendors: vendor[];
ticNo:any; status:any;
quotations: job[];
quo: any = {};
emp: any = [];

//ticketNo: any; jobNoteNo: any; RepairingMethod: any;

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.job.viewJob(params['id']).subscribe(res => {
        console.log(res);
        this.JobDetails = res;
        var jobNote = this.JobDetails[0];
        console.log(jobNote);
        this.ticNo = jobNote.ticket_no;
        

        this.angForm.get('ticket_no').setValue(this.ticNo);
        this.angForm1.get('ticket_no1').setValue(this.ticNo);
        this.angForm2.get('ticket_no2').setValue(this.ticNo);
        this.angForm3.get('ticket_no3').setValue(this.ticNo);
        this.angForm4.get('ticket_no4').setValue(this.ticNo);

        this.status = jobNote.job_status;

        if(this.status=='Vendor'){
          this.angForm.disable();
        }
        else if(this.status=='Vendor_Quotation'){
          this.angForm.disable();
          this.angForm1.disable();
          this.angForm2.get('quotation_no2').setValue(jobNote.quotation_no);    
          
        }
        else if(this.status=='Vendor_Quotation_Approval'){
          this.angForm.disable();
          this.angForm1.disable();
          this.angForm2.disable();
          this.angForm3.get('quotation_no3').setValue(jobNote.quotation_no);   
          
        }
        else if(this.status=='Vendor_Payment'){
          this.angForm.disable();
          this.angForm1.disable();
          this.angForm2.disable();
          this.angForm3.disable();  
          
        }
        else if(this.status=='Close_Job'){
          this.angForm.disable();
          this.angForm1.disable();
          this.angForm2.disable();
          this.angForm3.disable();  
          this.angForm4.disable(); 
          
        }



    });
  });



  this.vd
  .getVendor()
  .subscribe((data: vendor[]) => {
    this.vendors = data;

});


this.job
.getNextQuotationNo()
.subscribe((data: job[]) => {
  
  this.quotations = data;
  console.log(this.quotations);
  //var quo =this.quotations;
this.quo = this.quotations;
console.log(this.quo.job_status);


  if(this.quotations == null){
    new_quotation_no = 'QT0001';
  }
  else{

    var code = this.quo.quotation_no;
    console.log(code);

    var sub1 = code.substring(0, 2);
    var sub2 = code.substring(2);
    var count = parseInt(sub2);
    var newcount = count + 1;

    if(newcount <=9)
    {		
      var new_quotation_no = 'QT000'+ newcount;
    }
    else if(newcount <=99)
    {		
      var new_quotation_no = 'QT00'+ newcount;
    }
    else if(newcount <=999)
    {		
      var new_quotation_no = 'QT0'+ newcount;
    }
    
  }


  this.angForm1.get('quotation_no').setValue(new_quotation_no);


  
});

  }


  UpdateJobVendor(vendor_selected, vendor_comment, job_status) {
    this.route.params.subscribe(params => {
       this.job.UpdateJobVendor(vendor_selected, vendor_comment, job_status, params['id']);
       alert('Job Updated Successfully');
       window.location.reload();
       //this.router.navigate(['']);
       
       
 });
}

UpdateTicketVendor(ticket_status, ticket_no) {
  this.route.params.subscribe(params => {
     this.tkt.UpdateTicketVendor(ticket_status, ticket_no);
     //alert('Ticket Received Successfully');
     //window.location.reload();
     //this.router.navigate(['']);
     
     
});
}

UpdateJobQuotation(quotation_no, quotation_refNo, quotation_amount, quotation_date, quotation_description, quotation_attachment, job_status1) {
  this.route.params.subscribe(params => {
     this.job.UpdateJobQuotation(quotation_no, quotation_refNo, quotation_amount, quotation_date, quotation_description, quotation_attachment, job_status1, params['id']);
     alert('Job Updated Successfully');
     window.location.reload();
     //this.router.navigate(['']);
     
     
});
}

UpdateTicketQuotation(ticket_status1, ticket_no1) {
  this.route.params.subscribe(params => {
     this.tkt.UpdateTicketQuotation(ticket_status1, ticket_no1);
     //alert('Ticket Received Successfully');
     //window.location.reload();
     //this.router.navigate(['']);
     
     
});
}

UpdateJobApproval(quotation_no2, quotation_approved_date, quotation_approvedBy, job_status2) {
  this.route.params.subscribe(params => {
     this.job.UpdateJobApproval(quotation_no2, quotation_approved_date, quotation_approvedBy, job_status2, params['id']);
     alert('Job Updated Successfully');
     window.location.reload();
     //this.router.navigate(['']);
     
     
});
}

UpdateTicketApproval(ticket_status2, ticket_no2) {
  this.route.params.subscribe(params => {
     this.tkt.UpdateTicketApproval(ticket_status2, ticket_no2);
     //alert('Ticket Received Successfully');
     //window.location.reload();
     //this.router.navigate(['']);
     
     
});
}

UpdateJobPayment(quotation_no3, bill_no, payment_amount, payment_date, payment_description, payment_attachment, job_status3) {
  this.route.params.subscribe(params => {
     this.job.UpdateJobPayment(quotation_no3, bill_no, payment_amount, payment_date, payment_description, payment_attachment, job_status3, params['id']);
     alert('Job Updated Successfully');
     window.location.reload();
     //this.router.navigate(['']);
     
     
});
}

UpdateTicketPayment(ticket_status3, ticket_no3) {
  this.route.params.subscribe(params => {
     this.tkt.UpdateTicketPayment(ticket_status3, ticket_no3);
     //alert('Ticket Received Successfully');
     //window.location.reload();
     //this.router.navigate(['']);
     
     
});
}

UpdateJobVendorReceived(vendor_receive_date, vendor_rating, vendor_receive_comment, job_status4) {
  this.route.params.subscribe(params => {
     this.job.UpdateJobVendorReceived(vendor_receive_date, vendor_rating, vendor_receive_comment, job_status4, params['id']);
     alert('Job Updated Successfully');
     window.location.reload();
     //this.router.navigate(['']);
     
     
});
}

UpdateTicketVendorReceived(ticket_status4, ticket_no4) {
  this.route.params.subscribe(params => {
     this.tkt.UpdateTicketVendorReceived(ticket_status4, ticket_no4);
     //alert('Ticket Received Successfully');
     //window.location.reload();
     //this.router.navigate(['']);
     
     
});
}


searchEmployee(search_employee_no){
  this.route.params.subscribe(params => {
    this.em.searchEmployee(search_employee_no).subscribe(res => {
      this.emp = res;
      console.log(this.emp);
      //this.showEmp = true;

  
    });
  });
  }

  rating:number;
  onClick(rating: number): void {
    this.rating = rating;

    this.angForm4.get('vendor_rating').setValue(this.rating);

  }

}
