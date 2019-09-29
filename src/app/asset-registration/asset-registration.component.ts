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
import { ActivityLogService } from '../services/activityLog.service'
import { AssetAuditTrailService } from '../services/assetAuditTrail.service'


@Component({
  selector: 'app-asset-registration',
  templateUrl: './asset-registration.component.html',
  styleUrls: ['./asset-registration.component.css']
})
export class AssetRegistrationComponent implements OnInit {

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
    private alog: ActivityLogService,
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

  currentUser: any;
  currentEmployeeNo: any;
  currentEmployeeName:  any;
  activity: any;
  action: any;

  addAsset(asset_category, asset_type, asset_code, asset_make, asset_model, asset_serial, asset_barcode, asset_name, asset_classification, asset_location, asset_owner_IT, asset_branch, asset_owner_branch,  asset_company, processor, RAM, hard_disk, display, os, installed_sw, description, asset_status, purchased_date, warranty_period) {
    this.ast.addAsset(asset_category, asset_type, asset_code, asset_make, asset_model, asset_serial, asset_barcode, asset_name, asset_classification, asset_location, asset_owner_IT, asset_branch, asset_owner_branch,  asset_company, processor, RAM, hard_disk, display, os, installed_sw, description, asset_status, purchased_date, warranty_period);
    
    this.activity = 'New Asset is added to the Asset Register | Asset Code: '+asset_code;
    this.currentUser = sessionStorage.getItem('currentUser');
    var user = JSON.parse(this.currentUser);
    this.currentEmployeeNo = user.employee_no;
    this.currentEmployeeName = user.employee_name;
    
    this.alog.addActivityLog(this.activity, this.currentEmployeeNo);

    this.action = 'ADD';
    this.audit.addAuditTrail(asset_code, asset_serial, asset_barcode, this.action, this.currentEmployeeNo, this.currentEmployeeName);

    this.router.navigate(['assetRegistration']);
    alert('New Asset is added Successfully.');
    window.location.reload();
  }





  categories: category[];
  makes: make[];
  locations: location[];
  employees: employee[];
  branches: branch[];

  types: any = [];
  models: any = [];
  assetCode: any = [];
  assetType: any = [];
  IThardware: any = [];
  BranchHardware: any = [];
  Warrant: any = [];
  Configuration: any = [];
  Description: any = [];
  emp: any = [];
  showEmp: any = [];

  ngOnInit() {

    this.IThardware = false;
    this.BranchHardware = false;
    this.Warrant = false;
    this.Configuration = false;
    this.Description = false;
  

    this.ca
    .getCategory()
    .subscribe((data: category[]) => {
      this.categories = data;

  });

  this.em
  .getITEmployee()
  .subscribe((data: employee[]) => {
    this.employees = data;

});

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

  }

  showTypes(asset_category){  

    this.route.params.subscribe(params => {
      if(asset_category!==""){
        this.ty.showTypes(asset_category).subscribe(res => {
          this.types = res;

          this.angForm.get('processor').setValue('');
          this.angForm.get('RAM').setValue('');
          this.angForm.get('hard_disk').setValue('');
          this.angForm.get('display').setValue('');
          this.angForm.get('os').setValue('');
          this.angForm.get('installed_sw').setValue('');
          this.angForm.get('description').setValue('');
          this.Configuration = false;
          this.Description = false;

          if(asset_category=="IT Hardware"){
            this.IThardware = true;
            this.BranchHardware = false;
            this.Warrant = true;
            this.angForm.get('asset_code').setValue('');
            this.angForm.get('asset_branch').setValue('');
            this.angForm.get('asset_owner_branch').setValue('');
            this.angForm.get('asset_company').setValue('');
            this.angForm.get('purchased_date').setValue('');
            this.angForm.get('warranty_period').setValue('');

          }
          else if(asset_category=="Branch Hardware"){
            this.BranchHardware = true;
            this.IThardware = false;
            this.Warrant = true;
            this.angForm.get('asset_code').setValue('');
            this.angForm.get('asset_location').setValue('');
            this.angForm.get('asset_owner_IT').setValue('');
            this.angForm.get('purchased_date').setValue('');
            this.angForm.get('warranty_period').setValue('');

          }
          else{
            this.IThardware = true;
            this.BranchHardware = false;
            this.Warrant = false;
            this.angForm.get('asset_type').setValue('');
            this.angForm.get('asset_code').setValue('');
            this.angForm.get('asset_location').setValue('');
            this.angForm.get('asset_owner_IT').setValue('');
            this.angForm.get('asset_branch').setValue('');
            this.angForm.get('asset_owner_branch').setValue('');
            this.angForm.get('asset_company').setValue('');
            this.angForm.get('purchased_date').setValue('');
            this.angForm.get('warranty_period').setValue('');
          }
      
        });
      }
      else{
        this.angForm.get('asset_type').setValue('');
        this.angForm.get('asset_code').setValue('');
        this.angForm.get('asset_location').setValue('');
        this.angForm.get('asset_owner_IT').setValue('');
        this.angForm.get('asset_branch').setValue('');
        this.angForm.get('asset_owner_branch').setValue('');
        this.angForm.get('asset_company').setValue('');
        this.angForm.get('purchased_date').setValue('');
        this.angForm.get('warranty_period').setValue('');
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


      showfields(asset_type){
        this.route.params.subscribe(params => {
          if(asset_type!==""){
            this.ty.showAssetCode(asset_type).subscribe(res => {
              this.assetType = res;
              console.log(this.assetType);
              var conf = this.assetType.configuration_type;
              console.log(conf);

                this.angForm.get('processor').setValue('');
                this.angForm.get('RAM').setValue('');
                this.angForm.get('hard_disk').setValue('');
                this.angForm.get('display').setValue('');
                this.angForm.get('os').setValue('');
                this.angForm.get('installed_sw').setValue('');
                this.angForm.get('description').setValue('');
                this.angForm.get('asset_location').setValue('');
                this.angForm.get('asset_owner_IT').setValue('');
                this.angForm.get('asset_branch').setValue('');
                this.angForm.get('asset_owner_branch').setValue('');
                this.angForm.get('asset_company').setValue('');
                this.angForm.get('purchased_date').setValue('');
                this.angForm.get('warranty_period').setValue('');

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



    showAssetCode1(asset_type){
      this.route.params.subscribe(params => {
        if(asset_type!==""){
          this.ast.showAssetCode1(asset_type).subscribe(res => {
            this.assetCode = res;
            console.log(this.assetCode);

            if(this.assetCode == null){
            
                this.route.params.subscribe(params => {
                    this.ty.showAssetCode(asset_type).subscribe(res => {
                      this.assetCode = res;
                      console.log(this.assetCode);
                      var code = this.assetCode.code_pattern;
                      console.log(code);
                      var new_asset_code = code + '001';
                
                      this.angForm.get('asset_code').setValue(new_asset_code);
                    });         
                });

            }
            else{
              var code = this.assetCode.asset_code;
              console.log(code);
              var sub1 = code.substring(0, code.length-3);
              var sub2 = code.substring(code.length-3);
              //console.log(sub1);
              //console.log(sub2);
              var count = parseInt(sub2);
              var newcount = count + 1;

              if(newcount <=9)
              {		
                var new_asset_code = sub1+ '00' +newcount;
              }
              else if(newcount <=99)
              {		
                var new_asset_code = sub1 + '0'+ newcount;
              }
              else if(newcount <=999)
              {		
                var new_asset_code = sub1 +''+ newcount;
              }

              this.angForm.get('asset_code').setValue(new_asset_code);

            }

          });
        }
        else{
          this.angForm.get('asset_code').setValue('');
        }

      });

      
    }

    searchEmployee(search_employee_no){
      this.route.params.subscribe(params => {
        this.em.searchEmployee(search_employee_no).subscribe(res => {
          this.emp = res;
          console.log(this.emp);
          //this.showEmp = true;
    
      
        });
      });
      }

      assetResult: any = [];

      duplicateAlert: boolean;

      CheckSerialValidity(asset_serial){
        this.route.params.subscribe(params => {
          this.ast.CheckSerialValidity(asset_serial).subscribe(res => {
            this.assetResult = res;
            console.log(this.assetResult);

            if(this.assetResult.length !== 0){
              this.duplicateAlert = true;
            }
            else{
              this.duplicateAlert = false;

            }
            console.log(this.duplicateAlert);
            
      
        
          });
        });

      }

      assetResult1: any = [];

      duplicateAlert1: boolean;

      CheckSerialValidity1(asset_barcode){
        this.route.params.subscribe(params => {
          this.ast.CheckSerialValidity1(asset_barcode).subscribe(res => {
            this.assetResult1 = res;
            console.log(this.assetResult1);

            if(this.assetResult1.length !== 0){
              this.duplicateAlert1 = true;
            }
            else{
              this.duplicateAlert1 = false;

            }
            console.log(this.duplicateAlert1);
            
      
        
          });
        });

      }

}
