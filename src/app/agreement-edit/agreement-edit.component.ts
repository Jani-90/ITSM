import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AgreementService } from '../services/agreement.service';
import { VendorRatingService } from '../services/vendorRating.service';
import { AgreementRenewalService } from '../services/agreementRenewal.service';

@Component({
  selector: 'app-agreement-edit',
  templateUrl: './agreement-edit.component.html',
  styleUrls: ['./agreement-edit.component.css']
})
export class AgreementEditComponent implements OnInit {

  angForm: FormGroup;
  angForm1: FormGroup;

  constructor(private router: Router,
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private ag: AgreementService,
    private vr: VendorRatingService,
    private agr: AgreementRenewalService) {
      this.createForm();
    }

    createForm() {
      this.angForm = this.fb.group({
        vendor: [''],
        agreement_name: [''],
        agreement_type: [''],
        agreement_category: [''],  
        start_date: [''],
        renewal_period: [''],
        agreement_no: [''],
        end_date: [''],     
        agreement_status: ['', Validators.required ],
        vendor_rating: ['', Validators.required ],
        agreement_comment: ['', Validators.required ]
   
      });

      this.angForm1 = this.fb.group({
        agreement_no1: [''],
        renewal_period1: [''],
        new_end_date: [''],
        vendor1:  [''],
        renew_date: ['', Validators.required ],
        vendor_rating1: ['', Validators.required ],
        agreement_comment1: ['', Validators.required ]
   
      });
  
    }

    agrmt: any = {};

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.ag.editAgreement(params['id']).subscribe(res => {
        this.agrmt = res;
        console.log(this.agrmt);
        this.angForm.get('agreement_no').setValue(this.agrmt.agreement_no);
        this.angForm.get('agreement_name').setValue(this.agrmt.agreement_name);
        this.angForm.get('agreement_type').setValue(this.agrmt.agreement_type);
        this.angForm.get('agreement_category').setValue(this.agrmt.agreement_category);
        this.angForm.get('vendor').setValue(this.agrmt.vendor);

        var date1 = new Date(this.agrmt.start_date),
        mnth1 = ("0" + (date1.getMonth()+1)).slice(-2),
        day1  = ("0" + date1.getDate()).slice(-2);
        var Sdate = [ date1.getFullYear(), mnth1, day1 ].join("-");

        this.angForm.get('start_date').setValue(Sdate);

        var date2 = new Date(this.agrmt.end_date),
        mnth2 = ("0" + (date2.getMonth()+1)).slice(-2),
        day2  = ("0" + date2.getDate()).slice(-2);
        var Edate = [ date2.getFullYear(), mnth2, day2 ].join("-");

        this.angForm.get('end_date').setValue(Edate);
        this.angForm.get('renewal_period').setValue(this.agrmt.renewal_period);
        this.angForm.get('agreement_status').setValue(this.agrmt.agreement_status);

        this.angForm1.get('agreement_no1').setValue(this.agrmt.agreement_no);
        this.angForm1.get('renewal_period1').setValue(this.agrmt.renewal_period);
        this.angForm1.get('vendor1').setValue(this.agrmt.vendor);

    });
  });


  }

  rating:number;
  onClick(rating: number): void {
    this.rating = rating;

    this.angForm.get('vendor_rating').setValue(this.rating);

  }

  rating1:number;
  onClick1(rating1: number): void {
    this.rating1 = rating1;

    this.angForm1.get('vendor_rating1').setValue(this.rating1);

  }

  UpdateAgreement(vendor_rating, agreement_comment, agreement_status) {
    this.route.params.subscribe(params => {
       this.ag.UpdateAgreement(vendor_rating, agreement_comment, agreement_status, params['id']);
       alert('Agreement Updated Successfully');
       window.location.reload();
       //this.router.navigate(['']);
       
       
  });
  }

  AddRating(vendor, vendor_rating, agreement_comment) {   
       this.vr.AddRating(vendor, vendor_rating, agreement_comment);
       //alert('Agreement Updated Successfully');
       //window.location.reload();
       //this.router.navigate(['']);       

  }


  renewalPeriod : any = {};
  CalcEndDate(renew_date, renewal_period1){
    if(renew_date!=="" && renewal_period1 !==""){
      var startDate = new Date(renew_date);
      this.renewalPeriod = renewal_period1;

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

      this.angForm1.get('new_end_date').setValue(Edate);
    }
    else{
      this.angForm.get('new_end_date').setValue('');
    }

  }

  AddRenewal(agreement_no1, renew_date, new_end_date, vendor_rating1, agreement_comment1) {   
    this.agr.AddRenewal(agreement_no1, renew_date, new_end_date, vendor_rating1, agreement_comment1);
    alert('Agreement is renewed Successfully');
    window.location.reload();
    //this.router.navigate(['']);       

}



}
