import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AssetService } from '../services/asset.service';

@Component({
  selector: 'app-asset-modification',
  templateUrl: './asset-modification.component.html',
  styleUrls: ['./asset-modification.component.css']
})
export class AssetModificationComponent implements OnInit {

  angForm: FormGroup;

  constructor(private router: Router, 
  private route: ActivatedRoute,
  private fb: FormBuilder,
  private ast: AssetService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      asset_search_by: [''],
      asset_code: [''],
      asset_serial: [''],
      asset_barcode: ['']
  
    });
  

  
  }

  assetCode: boolean;
  assetSerial: boolean;
  assetBarcode: boolean;

  ngOnInit() {
    this.assetCode = false;
    this.assetSerial = false;
    this.assetBarcode = false;
  }

  ShowSearchField(asset_search_by){  

    this.route.params.subscribe(params => {
      console.log(asset_search_by);
      if(asset_search_by=="Asset Code"){
        this.assetCode = true;
        this.assetSerial = false;
        this.assetBarcode = false;
      }
      else if(asset_search_by=="Asset Serial"){
        this.assetCode = false;
        this.assetSerial = true;
        this.assetBarcode = false;
      }
      else if(asset_search_by=="Asset Barcode"){
        this.assetCode = false;
        this.assetSerial = false;
        this.assetBarcode = true;
      }
      else{
        this.assetCode = false;
        this.assetSerial = false;
        this.assetBarcode = false;
      }


    });
  }

  astSerial: any = [];
  showAsset(asset_serial){
    this.route.params.subscribe(params => {
      this.ast.showAsset(asset_serial).subscribe(res => {
        this.astSerial = res;
        //console.log(this.astSerial);
  
    
      });
    });
    }

    astCode: any = [];
    showAsset1(asset_code){
      this.route.params.subscribe(params => {
        this.ast.showAsset1(asset_code).subscribe(res => {
          this.astCode = res;
          console.log(this.astCode);
    
      
        });
      });
      }

    astBarcode: any = [];
    showAsset2(asset_barcode){
      this.route.params.subscribe(params => {
        this.ast.showAsset2(asset_barcode).subscribe(res => {
          this.astBarcode = res;
          console.log(this.astBarcode);
    
      
        });
      });
      }

      resetField(){
        this.astSerial = null;
        this.astCode = null;
        this.astBarcode = null;
        this.angForm.get('asset_code').setValue('');
        this.angForm.get('asset_serial').setValue('');
        this.angForm.get('asset_barcode').setValue('');
      }

}
