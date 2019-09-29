import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {

  angForm: FormGroup;

    constructor(private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private em: EmployeeService) {
      this.createForm();
    }

createForm() {
  this.angForm = this.fb.group({
    employee_no: ['', Validators.required ],
    user_role: ['', Validators.required ],


  });


}

  ngOnInit() {
  }

  employees: any = [];
  searchEmployee(search_employee_no){
    this.route.params.subscribe(params => {
      this.em.searchEmployee(search_employee_no).subscribe(res => {
        this.employees = res;
        console.log(this.employees);
  
    
      });
    });
    }


    updateUserRole(employee_no, user_role) {
      this.route.params.subscribe(params => {
         this.em.updateUserRole(employee_no, user_role);
         alert('User Role is successfully updated.');
         window.location.reload();
         this.router.navigate(['userRole']);
         
   });
  }

}
