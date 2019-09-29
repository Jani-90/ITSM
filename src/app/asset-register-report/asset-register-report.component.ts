import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { TypeService } from '../services/type.service';
import { AssetService } from '../services/asset.service';
import { category } from '../itsm';

@Component({
  selector: 'app-asset-register-report',
  templateUrl: './asset-register-report.component.html',
  styleUrls: ['./asset-register-report.component.css']
})
export class AssetRegisterReportComponent implements OnInit {

  angForm: FormGroup;

    constructor(private router: Router,
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private ca: CategoryService,
    private ty: TypeService,
    private ast: AssetService) {
      this.createForm();
    }

  createForm() {
    this.angForm = this.fb.group({
      asset_category: ['', Validators.required ],
      asset_type: ['', Validators.required ]

    });

  }

  categories: category[];
  types: any = [];

  ngOnInit() {

    this.ca
    .getCategory()
    .subscribe((data: category[]) => {
      this.categories = data;

  });

  }

  showTypes(asset_category){  
    this.route.params.subscribe(params => {
      if(asset_category!==""){
        this.ty.showTypes(asset_category).subscribe(res => {
          this.types = res;
        });
      }
      else{
        this.angForm.get('asset_type').setValue('');
      }
    });
  }

  asset: any = [];

  searchAsset(asset_category, asset_type){
    this.route.params.subscribe(params => {
      this.ast.searchAsset(asset_category, asset_type).subscribe(res => {
        this.asset = res;
        console.log(this.asset);
  
    
      });
    });
    }

}
