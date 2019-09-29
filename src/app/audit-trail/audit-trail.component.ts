import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AssetAuditTrailService } from '../services/assetAuditTrail.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-audit-trail', 
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.css']
})
export class AuditTrailComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private audit: AssetAuditTrailService,
    private em: EmployeeService) {
      
    }

  auditLog: any = [];
  asset:any;

  ngOnInit() {

    this.route.params.subscribe(params => {
      var ggg = this.route.params;
      console.log(ggg);
      this.audit.showAuditTrail(params['asset_serial']).subscribe(res => {
        this.auditLog = res;
        console.log(this.auditLog);
        this.asset = params['asset_serial'];
      });
    });
    
  }

  createDate:any;
  display(create_date){
    //alert(create_date);
    this.createDate = create_date.substring(0, 10);
    return this.createDate;
  }

  /*employees: any;
  searchEmployee(search_employee_no){
    console.log(search_employee_no);
    //this.route.params.subscribe(params => {
     this.em.searchEmployee(search_employee_no).subscribe(res => {
        //.employees = res;
        //console.log(this.employees);
        //return this.employees.employee_name;
        return '5';
  
    
      //});
   });
    }*/

}
