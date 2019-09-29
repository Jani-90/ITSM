import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { TypeService } from '../services/type.service';
import { category, type, make, location, employee, branch } from '../itsm';
import { MakeService } from '../services/make.service'
import { ModelService } from '../services/model.service'
import { LocationService } from '../services/location.service'
import { EmployeeService } from '../services/employee.service'
import { BranchService } from '../services/branch.service'
import { AssetService } from '../services/asset.service'
import { AssetAuditTrailService } from '../services/assetAuditTrail.service'

@Component({
  selector: 'app-asset-edit',
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.css']
})
export class AssetEditComponent implements OnInit {

  angForm: FormGroup;

    constructor(private router: Router,
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private ca: CategoryService,
    private ty: TypeService,
    private ma : MakeService,
    private mo : ModelService,
    private lo : LocationService,
    private em: EmployeeService,
    private br: BranchService,
    private ast: AssetService,
    private audit: AssetAuditTrailService) {
      this.createForm();
    }

  createForm() {
    this.angForm = this.fb.group({
      asset_category: ['', Validators.required ],
      asset_type: ['', Validators.required ],
      asset_serial: ['', Validators.required ],
      asset_barcode: ['', Validators.required ],
      asset_name: ['', Validators.required ],
      asset_classification: ['', Validators.required ],
      asset_location: ['', Validators.required ],
      asset_owner_IT: ['', Validators.required ],
      asset_branch: ['', Validators.required ],
      asset_owner_branch: ['', Validators.required ],
      asset_company: ['', Validators.required ],
      processor: ['', Validators.required ],
      RAM: ['', Validators.required ],
      hard_disk: ['', Validators.required ],
      display: ['', Validators.required ],
      os: ['', Validators.required ],
      installed_sw: [''],
      description: [''],
      asset_code: [''],
      asset_make: [''],
      asset_model: [''],
      asset_status: [''],
      purchased_date: [''],
      warranty_period: ['']
 
    });

  }

  asset: any = {};

  makes: make[];
  models: any = [];
  locations: location[];
  employees: employee[];
  branches: branch[];



  ngOnInit() {

    this.ma
    .getMake()
    .subscribe((data: make[]) => {
      this.makes = data;
  
  });

  this.lo
.getLocation()
.subscribe((data: location[]) => {
  this.locations = data;

});

this.br
.getBranch()
.subscribe((data: branch[]) => {
  this.branches = data;

});

this.em
.getITEmployee()
.subscribe((data: employee[]) => {
  this.employees = data;

});



    this.route.params.subscribe(params => {
      this.ast.editAsset(params['id']).subscribe(res => {
        this.asset = res;
        console.log(this.asset);
        this.showfields(this.asset.asset_type);
        if(this.asset.asset_make!==''){
          this.showModels(this.asset.asset_make);
        }
        
        this.showfields2(this.asset.asset_category);

        this.angForm.get('asset_category').setValue(this.asset.asset_category);
        this.angForm.get('asset_type').setValue(this.asset.asset_type);
        this.angForm.get('asset_code').setValue(this.asset.asset_code);
        this.angForm.get('asset_serial').setValue(this.asset.asset_serial);
        this.angForm.get('asset_barcode').setValue(this.asset.asset_barcode);
        this.angForm.get('asset_name').setValue(this.asset.asset_name);
        this.angForm.get('description').setValue(this.asset.description);
        this.angForm.get('asset_make').setValue(this.asset.asset_make);
        this.angForm.get('asset_model').setValue(this.asset.asset_model);

        this.angForm.get('asset_classification').setValue(this.asset.asset_classification);
        this.angForm.get('asset_location').setValue(this.asset.asset_location);
        this.angForm.get('asset_owner_IT').setValue(this.asset.asset_owner_IT);
        this.angForm.get('asset_branch').setValue(this.asset.asset_branch);
        this.angForm.get('asset_owner_branch').setValue(this.asset.asset_owner_branch);
        this.angForm.get('asset_company').setValue(this.asset.asset_company);
        this.angForm.get('asset_status').setValue(this.asset.asset_status);
        this.angForm.get('processor').setValue(this.asset.processor);
        this.angForm.get('RAM').setValue(this.asset.RAM);

        this.angForm.get('hard_disk').setValue(this.asset.hard_disk);
        this.angForm.get('display').setValue(this.asset.display);
        this.angForm.get('os').setValue(this.asset.os);
        this.angForm.get('installed_sw').setValue(this.asset.installed_sw);

        var date = new Date(this.asset.purchased_date),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
        var Edate = [ date.getFullYear(), mnth, day ].join("-");
        console.log(Edate);
        
        this.angForm.get('purchased_date').setValue(Edate);
        this.angForm.get('warranty_period').setValue(this.asset.warranty_period);

    });
  });


  }

  assetType: any = [];
  Configuration: any = [];
  Description: any = [];

  showfields(asset_type){
    this.route.params.subscribe(params => {

      if(asset_type!==""){
        this.ty.showAssetCode(asset_type).subscribe(res => {
          this.assetType = res;
          console.log(this.assetType);
          var conf = this.assetType.configuration_type;
          console.log(conf);



            if(conf=='Configuration'){
              this.Configuration = true;
              this.Description = false;
            }
            else if(conf=='Description'){
              this.Description = true;
              this.Configuration = false;
            }
            else if(conf=='N/A'){
              this.Configuration = false;
              this.Description = false;

            }


        });
      }
    });


  }

  
  showModels(asset_make){
    this.route.params.subscribe(params => {
      this.mo.showModels(asset_make).subscribe(res => {
        this.models = res;
        console.log(this.models);
  
    
      });
    });
    }

    IThardware: any = [];
    BranchHardware: any = [];
    Warrant: any = [];

    showfields2(asset_category){  

      this.route.params.subscribe(params => {
        if(asset_category!==""){
  
            if(asset_category=="IT Hardware"){
              this.IThardware = true;
              this.BranchHardware = false;
              this.Warrant = true;
  
            }
            else if(asset_category=="Branch Hardware"){
              this.BranchHardware = true;
              this.IThardware = false;
              this.Warrant = true;
  
            }
            else{
              this.IThardware = true;
              this.BranchHardware = false;
              this.Warrant = false;

            }        

        }

      });
      
    }

    currentUser: any;
    currentEmployeeNo: any;
    currentEmployeeName: any;
    action: any;

    UpdateAsset(asset_category, asset_type, asset_code, asset_make, asset_model, asset_serial, asset_barcode, asset_name, asset_classification, asset_location, asset_owner_IT, asset_branch, asset_owner_branch,  asset_company, processor, RAM, hard_disk, display, os, installed_sw, description, asset_status, purchased_date, warranty_period) {
      this.route.params.subscribe(params => {
         this.ast.UpdateAsset(asset_category, asset_type, asset_code, asset_make, asset_model, asset_serial, asset_barcode, asset_name, asset_classification, asset_location, asset_owner_IT, asset_branch, asset_owner_branch,  asset_company, processor, RAM, hard_disk, display, os, installed_sw, description, asset_status, purchased_date, warranty_period, params['id']);
         
         this.currentUser = sessionStorage.getItem('currentUser');
         var user = JSON.parse(this.currentUser);
         this.currentEmployeeNo = user.employee_no;
         this.currentEmployeeName = user.employee_name;
        
         if(asset_status=='INACTIVE'){
          this.action = 'INACTIVE';
         }
         else{
          this.action = 'UPDATE';
         }
         
         this.audit.addAuditTrail(asset_code, asset_serial, asset_barcode, this.action, this.currentEmployeeNo, this.currentEmployeeName);
         
         alert('Asset Details are successfully updated.');
         window.location.reload();
         this.router.navigate(['assetModification']);
         
   });
  }

  emp: any = [];
  searchEmployee(search_employee_no){
    this.route.params.subscribe(params => {
      this.em.searchEmployee(search_employee_no).subscribe(res => {
        this.emp = res;
        console.log(this.emp);
        //this.showEmp = true;
  
    
      });
    });
    }






}
