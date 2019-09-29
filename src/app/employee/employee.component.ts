import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { BranchService } from '../services/branch.service';
import { EmployeeService } from '../services/employee.service';
import { branch, employee } from '../itsm';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  angForm: FormGroup;
  angForm1: FormGroup;

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private br: BranchService,
    private em: EmployeeService) {
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

  this.angForm1 = this.fb.group({
    search_employee_no: ['']

  });

}

  
addEmployee(employee_no, employee_name, employee_type, designation, company, employee_branch, employee_status, username, password) {
  this.em.addEmployee(employee_no, employee_name, employee_type, designation, company, employee_branch, employee_status, username, password);
  this.router.navigate(['employee']);
  alert('New Employee is added Successfully.');
  window.location.reload();
}

  branches: branch[];
  //employees: employee[];

  employees: any = [];

  ngOnInit() {

    this.br
    .getBranch()
    .subscribe((data: branch[]) => {
      this.branches = data;

  });





  }

  searchEmployee(search_employee_no){
  this.route.params.subscribe(params => {
    this.em.searchEmployee(search_employee_no).subscribe(res => {
      this.employees = res;
      console.log(this.employees);

  
    });
  });
  }


}
