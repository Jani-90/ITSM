import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { PagerService } from '../services/pager.service';
import { VendorService } from '../services/vendor.service';
import { vendor } from '../itsm';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  angForm: FormGroup;

  constructor(private router: Router, 
    private fb: FormBuilder, 
    private pagerService: PagerService,
    private vd: VendorService,) { 
      this.createForm();
    }

    createForm() {
      this.angForm = this.fb.group({
        vendor_name: ['', Validators.required ],
        vendor_address: ['', Validators.required ],
        vendor_contact_no1: ['', Validators.required, Validators.pattern],
        vendor_email: ['', Validators.required,  Validators.pattern ],
        vendor_code: [''],
        vendor_contact_no2: ['', Validators.pattern ],
        contact_person: [''],
        telephone_no: ['', Validators.pattern ],
        mobile_no: ['', Validators.pattern ],
        email: ['', Validators.pattern ],
        vendor_status: ['']
  
      });
    }

  vendorCodes: any = {};
  vendors: vendor[];

  ngOnInit() {

    this.vd
    .getVendorCode()
    .subscribe((data: vendor[]) => {
      
      this.vendorCodes = data;
      
      if(this.vendorCodes == null){
        new_vendor_code = 'VC0001';
      }
      else{
  
        var code = this.vendorCodes.vendor_code;
        
  
        var sub1 = code.substring(0, 2);
        var sub2 = code.substring(2);
        var count = parseInt(sub2);
        var newcount = count + 1;
  
        if(newcount <=9)
        {		
          var new_vendor_code = 'VC000'+ newcount;
        }
        else if(newcount <=99)
        {		
          var new_vendor_code = 'VC00'+ newcount;
        }
        else if(newcount <=999)
        {		
          var new_vendor_code = 'VC0'+ newcount;
        }
  
      }
  
  
      this.angForm.get('vendor_code').setValue(new_vendor_code);
      
  });

  this.vd
  .getVendor()
  .subscribe((data: vendor[]) => {
    this.vendors = data;
    console.log(this.vendors);
    // initialize to page 1
    //this.setPageLocation(1);
});

  }

  addVendor(vendor_code, vendor_name, vendor_address, vendor_contact_no1, vendor_contact_no2, vendor_email, contact_person, telephone_no, mobile_no, email, vendor_status ) {
    this.vd.addVendor(vendor_code, vendor_name, vendor_address, vendor_contact_no1, vendor_contact_no2, vendor_email, contact_person, telephone_no, mobile_no, email, vendor_status);
    this.router.navigate(['vendor']);
    alert('New Vendor is added Successfully.');
    window.location.reload();
  }

}
