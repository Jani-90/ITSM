import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { LocationService } from '../services/location.service';
import { BranchService } from '../services/branch.service';
import { location, branch } from '../itsm';
import { PagerService } from '../services/pager.service';


@Component({
  selector: 'app-asset-location',
  templateUrl: './asset-location.component.html',
  styleUrls: ['./asset-location.component.css']
})
export class AssetLocationComponent implements OnInit {

  angForm: FormGroup;
  angForm1: FormGroup;
  constructor(private router: Router, 
            private fb: FormBuilder, private lo : LocationService,
            private pagerService: PagerService,
            private br: BranchService) {
  this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      location_name: ['', Validators.required ],
      location_code: [''],
      location_status: ['']

    });

    this.angForm1 = this.fb.group({
      branch_name: ['', Validators.required ],
      branch_code: ['', Validators.required ],
      branch_id: [''],
      branch_status: ['']

    });

  }

  addLocation(location_code, location_name, location_status) {
    this.lo.addLocation(location_code, location_name, location_status);
    this.router.navigate(['location']);
    alert('New Location is added Successfully.');
    window.location.reload();
  }

  addBranch(branch_id, branch_name, branch_code, branch_status) {
    this.br.addBranch(branch_id, branch_name, branch_code, branch_status);
    this.router.navigate(['location']);
    alert('New Branch is added Successfully.');
    window.location.reload();
  }

  locations: location[];
  branches: branch[];

  locationCodes: any = {};
  branchIds: any = {};

  // pager object
  pager: any = {};
  pager1: any = {};

  // paged items
  pagedItems: any[];
  pagedItems1: any[];

  ngOnInit() {

    this.lo
    .getLocation()
    .subscribe((data: location[]) => {
      this.locations = data;
      console.log(this.locations);
      // initialize to page 1
      this.setPageLocation(1);
  });

    this.lo
    .getLocationCode()
    .subscribe((data: location[]) => {
      
      this.locationCodes = data;
      
      if(this.locationCodes == null){
        new_location_code = 'ALC001';
      }
      else{
  
        var code = this.locationCodes.location_code;
        
  
        var sub1 = code.substring(0, 3);
        var sub2 = code.substring(3);
        var count = parseInt(sub2);
        var newcount = count + 1;
  
        if(newcount <=9)
        {		
          var new_location_code = 'ALC00'+ newcount;
        }
        else if(newcount <=99)
        {		
          var new_location_code = 'ALC0'+ newcount;
        }
        else if(newcount <=999)
        {		
          var new_location_code = 'ALC0'+ newcount;
        }
  
      }
  
  
      this.angForm.get('location_code').setValue(new_location_code);
      
  });


  this.br
  .getBranch()
  .subscribe((data: branch[]) => {
    this.branches = data;
    console.log(this.branches);
    // initialize to page 1
    this.setPageBranch(1);
});

this.br
.getBranchId()
.subscribe((data: branch[]) => {
  //console.log(data);
  this.branchIds = data;
  //console.log(this.makeCodes.make_id);
  
  if(this.branchIds == null){
    var new_branch_id = 1;
  }
  else{

    var code = this.branchIds.branch_id;

    var count = parseInt(code);
    var new_branch_id = count + 1;

  }

  this.angForm1.get('branch_id').setValue(new_branch_id);
});

}

  setPageLocation(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.locations.length, page);
    //console.log(this.pager);
    // get current page of items
    this.pagedItems = this.locations.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

setPageBranch(page: number) {
  // get pager object from service
  this.pager1 = this.pagerService.getPager(this.branches.length, page);

  // get current page of items
  this.pagedItems1 = this.branches.slice(this.pager1.startIndex, this.pager1.endIndex + 1);
}


  }