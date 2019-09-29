import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { VendorService } from '../services/vendor.service';
import { vendor } from '../itsm';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})

export class VendorEditComponent implements OnInit {

  angForm: FormGroup;
  vendor: any = {};

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private fb: FormBuilder, 
    private vd: VendorService,) { 
      this.createForm();
    }

    createForm() {
      this.angForm = this.fb.group({
        vendor_name: ['', Validators.required ],
        vendor_address: ['', Validators.required ],
        vendor_contact_no1: ['', Validators.required ],
        vendor_email: ['', Validators.required ],
        vendor_code: [''],
        vendor_contact_no2: [''],
        contact_person: [''],
        telephone_no: [''],
        mobile_no: [''],
        email: [''],
        vendor_status: ['']
  
      });
    }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.vd.editVendor(params['id']).subscribe(res => {
        this.vendor = res;
        console.log(this.vendor);
        this.angForm.get('vendor_code').setValue(this.vendor.vendor_code);
        this.angForm.get('vendor_name').setValue(this.vendor.vendor_name);
        this.angForm.get('vendor_address').setValue(this.vendor.vendor_address);
        this.angForm.get('vendor_contact_no1').setValue(this.vendor.vendor_contact_no1);
        this.angForm.get('vendor_contact_no2').setValue(this.vendor.vendor_contact_no2);
        this.angForm.get('vendor_email').setValue(this.vendor.vendor_email);
        this.angForm.get('contact_person').setValue(this.vendor.contact_person);
        this.angForm.get('telephone_no').setValue(this.vendor.telephone_no);
        this.angForm.get('mobile_no').setValue(this.vendor.mobile_no);
        this.angForm.get('email').setValue(this.vendor.email);
        this.angForm.get('vendor_status').setValue(this.vendor.vendor_status);

    });
  });

  }

  updateVendor(vendor_code, vendor_name, vendor_address, vendor_contact_no1, vendor_contact_no2, vendor_email, contact_person, telephone_no, mobile_no, email, vendor_status ) {
    this.route.params.subscribe(params => {
       this.vd.updateVendor(vendor_code, vendor_name, vendor_address, vendor_contact_no1, vendor_contact_no2, vendor_email, contact_person, telephone_no, mobile_no, email, vendor_status, params['id']);
       alert('Vendor Details are successfully updated.');
       window.location.reload();
       this.router.navigate(['vendor']);
       
 });
}

}
