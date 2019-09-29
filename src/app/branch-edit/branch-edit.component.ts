import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { BranchService } from '../services/branch.service';



@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.css']
})
export class BranchEditComponent implements OnInit {

  branch: any = {};
  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private fb: FormBuilder,
    private br : BranchService) {
      this.createForm();
   }

  createForm() {
    this.angForm = this.fb.group({
      branch_name: ['', Validators.required ],
      branch_code: ['', Validators.required ],
      branch_id: [''],
      branch_status: ['']

    });

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.br.editBranch(params['id']).subscribe(res => {
        this.branch = res;
        console.log(this.branch);
        this.angForm.get('branch_id').setValue(this.branch.branch_id);
        this.angForm.get('branch_name').setValue(this.branch.branch_name);
        this.angForm.get('branch_code').setValue(this.branch.branch_code);
        this.angForm.get('branch_status').setValue(this.branch.branch_status);
    });
  });



  }


  updateBranch(branch_id, branch_name, branch_code, branch_status) {
    this.route.params.subscribe(params => {
       this.br.updateBranch(branch_id, branch_name, branch_code, branch_status, params['id']);
       alert('Branch Details are successfully updated.');
       window.location.reload();
       this.router.navigate(['location']);
       
 });
}

}
