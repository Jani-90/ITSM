import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-asset-location-edit',
  templateUrl: './asset-location-edit.component.html',
  styleUrls: ['./asset-location-edit.component.css']
})
export class AssetLocationEditComponent implements OnInit {

  location: any = {};
  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private fb: FormBuilder,
    private lo : LocationService) {
      this.createForm();
   }

  createForm() {
    this.angForm = this.fb.group({
      location_name: ['', Validators.required ],
      location_status: ['', Validators.required ],
      location_code: ['']

    });
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.lo.editLocation(params['id']).subscribe(res => {
        this.location = res;
        this.angForm.get('location_code').setValue(this.location.location_code);
        this.angForm.get('location_name').setValue(this.location.location_name);
        this.angForm.get('location_status').setValue(this.location.location_status);
    });
  });

  }

  updateLocation(location_code, location_name, location_status) {
    this.route.params.subscribe(params => {
       this.lo.updateLocation(location_code, location_name, location_status, params['id']);
       alert('Location Details are successfully updated.');
       window.location.reload();
       this.router.navigate(['location']);
       
 });
}

}
