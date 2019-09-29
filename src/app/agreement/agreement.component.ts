import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { VendorService } from '../services/vendor.service';
import { AgreementService } from '../services/agreement.service';
import { vendor, agreement } from '../itsm';
import { PagerService } from '../services/pager.service';


@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css']
})
export class AgreementComponent implements OnInit {

  angForm: FormGroup;

    constructor(private router: Router,
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private vd: VendorService,
    private ag: AgreementService,
    private pagerService: PagerService) {
      this.createForm();
    }

  createForm() {
    this.angForm = this.fb.group({
      vendor: ['', Validators.required ],
      agreement_name: ['', Validators.required ],
      agreement_type: ['', Validators.required ],
      agreement_category: ['', Validators.required ],  
      start_date: ['', Validators.required],
      renewal_period: ['', Validators.required],
      agreement_no: [''],
      end_date: [''],     
      agreement_status: ['']      
 
    });

  }

  vendors: vendor[];
  agreementNos: any = {};
  agreements: agreement[];

    // pager object
    pager: any = {};
  
    // paged items
    pagedItems: any[];


  ngOnInit() {

    this.vd
    .getVendor()
    .subscribe((data: vendor[]) => {
      this.vendors = data;
  
  });

  this.ag
  .getAgreement()
  .subscribe((data: agreement[]) => {
    this.agreements = data;
    console.log(this.agreements);
    // initialize to page 1
    this.setPageAgreement(1);
});

  this.ag
  .getAgreementNo()
  .subscribe((data: agreement[]) => {
    
    this.agreementNos = data;
    
    if(this.agreementNos == null){
      var new_agreementNo = 'AGT001';
    }
    else{

      var code = this.agreementNos.agreement_no;
      

      var sub1 = code.substring(0, 3);
      var sub2 = code.substring(3);
      var count = parseInt(sub2);
      var newcount = count + 1;

      if(newcount <=9)
      {		
        var new_agreementNo = 'AGT00'+ newcount;
      }
      else if(newcount <=99)
      {		
        var new_agreementNo = 'AGT0'+ newcount;
      }
      else if(newcount <=999)
      {		
        var new_agreementNo = 'AGT0'+ newcount;
      }

    }


    this.angForm.get('agreement_no').setValue(new_agreementNo);
    
});


  }

  resetField(){
    
    this.angForm.get('end_date').setValue('');
  }

  //startDate : any = {};
  renewalPeriod : any = {};
  CalcEndDate(start_date, renewal_period){
    if(start_date!=="" && renewal_period !==""){
      var startDate = new Date(start_date);
      this.renewalPeriod = renewal_period;

      if(this.renewalPeriod=='One Month'){
        var X = 1;
      }
      else if(this.renewalPeriod=='Six Months'){
        var X = 6;
      }
      else if(this.renewalPeriod=='One Year'){
        var X = 12;
      }
      else if(this.renewalPeriod=='Two Years'){
        var X = 24;
      }
      if(this.renewalPeriod=='Five Years'){
        var X = 60;
      }
      startDate.setMonth(startDate.getMonth() + X);
      console.log(startDate);

      var date = new Date(startDate),
      mnth = ("0" + (date.getMonth()+1)).slice(-2),
      day  = ("0" + date.getDate()).slice(-2);
      var Edate = [ date.getFullYear(), mnth, day ].join("-");
      console.log(Edate);

      this.angForm.get('end_date').setValue(Edate);
    }
    else{
      this.angForm.get('end_date').setValue('');
    }

  }

  addAgreement(agreement_no, vendor, agreement_name, agreement_type, agreement_category, start_date, end_date, renewal_period, agreement_status) {
    this.ag.addAgreement(agreement_no, vendor, agreement_name, agreement_type, agreement_category, start_date, end_date, renewal_period, agreement_status);
    this.router.navigate(['agreement']);
    alert('New Agreement is added Successfully.');
    window.location.reload();
  }

  setPageAgreement(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.agreements.length, page);
    //console.log(this.pager);
    // get current page of items
    this.pagedItems = this.agreements.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

}
