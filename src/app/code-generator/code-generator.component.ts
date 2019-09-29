import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { PagerService } from '../services/pager.service';
import { CategoryService } from '../services/category.service';
import { TypeService } from '../services/type.service';
import { category, type } from '../itsm';

@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.component.html',
  styleUrls: ['./code-generator.component.css']
})
export class CodeGeneratorComponent implements OnInit {

  angForm: FormGroup;
  angForm1: FormGroup;

  constructor(private router: Router, 
    private fb: FormBuilder, private ca: CategoryService,
    private pagerService: PagerService,
    private ty: TypeService) {
      this.createForm();
    }

createForm() {
  this.angForm = this.fb.group({
    category_name: ['', Validators.required ],
    category_id: [''],
    category_status: ['']

  });

  this.angForm1 = this.fb.group({
    type_category_name: ['', Validators.required ],
    type_name: ['', Validators.required ],
    code_pattern: ['', Validators.required ],
    configuration_type: ['', Validators.required ],
    type_id: [''],
    type_status: ['']

  });
}

addCategory(category_id, category_name, category_status) {
  this.ca.addCategory(category_id, category_name, category_status);
  this.router.navigate(['codegenerator']);
  alert('New Category Name is added Successfully.');
  window.location.reload();
}

addType(type_id, type_category_name, type_name, code_pattern, configuration_type, type_status) {
  this.ty.addType(type_id, type_category_name, type_name, code_pattern, configuration_type, type_status);
  this.router.navigate(['codegenerator']);
  alert('New Type Name is added Successfully.');
  window.location.reload();
}

categories: category[];
types: type[];

categoryIds: any = {};
typeIds: any = {};

 // pager object
 pager: any = {};
 pager1: any = {};

 // paged items
 pagedItems: any[];
 pagedItems1: any[];

  ngOnInit() {

    this.ca
    .getCategory()
    .subscribe((data: category[]) => {
      this.categories = data;
      console.log(this.categories);
      // initialize to page 1
      this.setPageCategory(1);
  });

  this.ca
  .getCategoryId()
  .subscribe((data: category[]) => {
    //console.log(data);
    this.categoryIds = data;
    //console.log(this.makeCodes.make_id);
    
    if(this.categoryIds == null){
      var new_category_id = 1;
    }
    else{

      var code = this.categoryIds.category_id;

      var count = parseInt(code);
      var new_category_id = count + 1;

      

    }


    this.angForm.get('category_id').setValue(new_category_id);
    
});

this.ty
.getType()
.subscribe((data: type[]) => {
  this.types = data;
  console.log(this.types);
  // initialize to page 1
  this.setPageType(1);
});


this.ty
.getTypeId()
.subscribe((data: type[]) => {
  //console.log(data);
  this.typeIds = data;
  //console.log(this.makeCodes.make_id);
  
  if(this.typeIds == null){
    var new_type_id = 1;
  }
  else{

    var code = this.typeIds.type_id;

    var count = parseInt(code);
    var new_type_id = count + 1;

    

  }


  this.angForm1.get('type_id').setValue(new_type_id);
  
});



  }

  setPageCategory(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.categories.length, page);
    //console.log(this.pager);
    // get current page of items
    this.pagedItems = this.categories.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  setPageType(page: number) {
    // get pager object from service
    this.pager1 = this.pagerService.getPager(this.types.length, page);
    //console.log(this.pager);
    // get current page of items
    this.pagedItems1 = this.types.slice(this.pager1.startIndex, this.pager1.endIndex + 1);
  }

}
