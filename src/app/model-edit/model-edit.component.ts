import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ModelService } from '../services/model.service';
import { MakeService } from '../services/make.service';
import { make } from '../itsm';

@Component({
  selector: 'app-model-edit',
  templateUrl: './model-edit.component.html',
  styleUrls: ['./model-edit.component.css']
})
export class ModelEditComponent implements OnInit {

  model: any = {};
  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private fb: FormBuilder,
    private mo : ModelService,
    private ma : MakeService) {
      this.createForm();
   }

  createForm() {
    this.angForm = this.fb.group({
      model_make_name: ['', Validators.required ],
      model_name: ['', Validators.required ],
      model_id: [''],
      model_status: ['']

    });
  }


  makes: make[];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.mo.editModel(params['id']).subscribe(res => {
        this.model = res;
        this.angForm.get('model_id').setValue(this.model.model_id);
        this.angForm.get('model_make_name').setValue(this.model.model_make_name);
        this.angForm.get('model_name').setValue(this.model.model_name);
        this.angForm.get('model_status').setValue(this.model.model_status);
    });
  });

  this.ma
  .getMake()
  .subscribe((data: make[]) => {
    this.makes = data;
    console.log(this.makes);
    
    
});


  }

  updateModel(model_id, model_make_name, model_name, model_status) {
    this.route.params.subscribe(params => {
       this.mo.updateModel(model_id, model_make_name, model_name, model_status, params['id']);
       alert('Model Details are successfully updated.');
       window.location.reload();
       this.router.navigate(['makemodel']);
       
 });
}

}
