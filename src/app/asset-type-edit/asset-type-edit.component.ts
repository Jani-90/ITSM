import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { TypeService } from '../services/type.service';
import { CategoryService } from '../services/category.service';
import { category } from '../itsm';

@Component({
  selector: 'app-asset-type-edit',
  templateUrl: './asset-type-edit.component.html',
  styleUrls: ['./asset-type-edit.component.css']
})
export class AssetTypeEditComponent implements OnInit {

  type: any = {};
  angForm: FormGroup;
  categories: category[];

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private fb: FormBuilder,
    private ca: CategoryService,
    private ty : TypeService) {
      this.createForm();
   }

  createForm() {
    this.angForm = this.fb.group({
      type_category_name: ['', Validators.required ],
      type_name: ['', Validators.required ],
      code_pattern: ['', Validators.required ],
      configuration_type: ['', Validators.required ],
      type_id: [''],
      type_status: ['', Validators.required ]

    });
  }

  ngOnInit() {

    this.ca
    .getCategory()
    .subscribe((data: category[]) => {
      this.categories = data;
      console.log(this.categories);
      
      
  });


    this.route.params.subscribe(params => {
      this.ty.editType(params['id']).subscribe(res => {
        this.type = res;
        console.log(this.type);
        this.angForm.get('type_id').setValue(this.type.type_id);
        this.angForm.get('type_category_name').setValue(this.type.type_category_name);
        this.angForm.get('type_name').setValue(this.type.type_name);
        this.angForm.get('code_pattern').setValue(this.type.code_pattern);
        this.angForm.get('configuration_type').setValue(this.type.configuration_type);
        this.angForm.get('type_status').setValue(this.type.type_status);
    });
  });

  }

  updateType(type_id, type_category_name, type_name, code_pattern, configuration_type, type_status) {
    this.route.params.subscribe(params => {
       this.ty.updateType(type_id, type_category_name, type_name, code_pattern, configuration_type, type_status, params['id']);
       alert('Type Details are successfully updated.');
       window.location.reload();
       this.router.navigate(['codegenerator']);
       
 });
}


}
