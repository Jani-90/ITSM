import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-asset-category-edit',
  templateUrl: './asset-category-edit.component.html',
  styleUrls: ['./asset-category-edit.component.css']
})
export class AssetCategoryEditComponent implements OnInit {

  category: any = {};
  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private fb: FormBuilder,
    private ca : CategoryService) {
      this.createForm();
   }

  createForm() {
    this.angForm = this.fb.group({
      category_name: ['', Validators.required ],
      category_id: [''],
      category_status: ['']

    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ca.editCategory(params['id']).subscribe(res => {
        this.category = res;
        this.angForm.get('category_id').setValue(this.category.category_id);
        this.angForm.get('category_name').setValue(this.category.category_name);
        this.angForm.get('category_status').setValue(this.category.category_status);
    });
  });
  }

  updateCategory(category_id, category_name, category_status) {
    this.route.params.subscribe(params => {
       this.ca.updateCategory(category_id, category_name, category_status, params['id']);
       alert('Category Details are successfully updated.');
       window.location.reload();
       this.router.navigate(['codegenerator']);
       
 });
}

}
