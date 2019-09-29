import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { MakeService } from '../services/make.service';

@Component({
  selector: 'app-make-edit',
  templateUrl: './make-edit.component.html',
  styleUrls: ['./make-edit.component.css']
})
export class MakeEditComponent implements OnInit {
  
  make: any = {};
  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private fb: FormBuilder,
    private ma : MakeService) {
      this.createForm();
   }

  createForm() {
    this.angForm = this.fb.group({
      make_name: ['', Validators.required ],
      make_id: [''],
      make_status: ['']

    });
  }



  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ma.editMake(params['id']).subscribe(res => {
        this.make = res;
        this.angForm.get('make_status').setValue(this.make.make_status);
        this.angForm.get('make_id').setValue(this.make.make_id);
        this.angForm.get('make_name').setValue(this.make.make_name);
    });
  });
  }

  updateMake(make_id, make_name, make_status) {
    this.route.params.subscribe(params => {
       this.ma.updateMake(make_id, make_name, make_status, params['id']);
       alert('Make Details are successfully updated.');
       window.location.reload();
       this.router.navigate(['makemodel']);
       
 });
}

}
