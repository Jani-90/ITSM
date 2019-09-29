import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { BranchService } from '../services/branch.service';
import { branch, employee } from '../itsm';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employee: any = {};
  angForm: FormGroup;
  branches: branch[];

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private fb: FormBuilder,
    private em : EmployeeService,
    private br : BranchService) {
      this.createForm();
   }

  createForm() {
    this.angForm = this.fb.group({
      employee_type: ['', Validators.required ],
      employee_no: ['', Validators.required ],
      employee_name: ['', Validators.required ],
      username: ['', Validators.required ],
      password: ['', Validators.required ],
      employee_branch: [''],
      designation: [''],
      company: [''],
      employee_status: ['']

    });

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.em.editEmployee(params['id']).subscribe(res => {
        this.employee = res;
        console.log(this.employee);
        this.angForm.get('employee_type').setValue(this.employee.employee_type);
        this.angForm.get('employee_no').setValue(this.employee.employee_no);
        this.angForm.get('employee_name').setValue(this.employee.employee_name);
        this.angForm.get('username').setValue(this.employee.username);
        this.angForm.get('password').setValue(this.employee.password);
        this.angForm.get('employee_branch').setValue(this.employee.employee_branch);
        this.angForm.get('designation').setValue(this.employee.designation);
        this.angForm.get('company').setValue(this.employee.company);
        this.angForm.get('employee_status').setValue(this.employee.employee_status);
    });
  });

  this.br
  .getBranch()
  .subscribe((data: branch[]) => {
    this.branches = data;

});

  }

  updateEmployee(employee_type, employee_no, employee_name, username, password, employee_branch, designation, company, employee_status) {
    this.route.params.subscribe(params => {
       this.em.updateEmployee(employee_type, employee_no, employee_name, username, password, employee_branch, designation, company, employee_status, params['id']);
       alert('Employee Details are successfully updated.');
       window.location.reload();
       this.router.navigate(['employee']);
       
 });
}

}
